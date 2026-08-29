import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { emptyProfile, statsPayload, applyResult } from "./streak-logic.mjs";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const PLAYERS_TABLE = process.env.PLAYERS_TABLE;
const DAILY_COUNTS_TABLE = process.env.DAILY_COUNTS_TABLE;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

async function handleResult(event) {
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }
  const { playerId, date, won } = body;
  if (!playerId || !date || typeof won !== "boolean") {
    return json(400, { error: "playerId (string), date (YYYY-MM-DD), and won (boolean) are required." });
  }

  const existing = await ddb.send(new GetCommand({ TableName: PLAYERS_TABLE, Key: { playerId } }));
  const before = existing.Item || emptyProfile(playerId);

  const { profile: after, alreadyRecorded } = applyResult(before, date, won);

  if (alreadyRecorded) {
    return json(200, statsPayload(after));
  }

  await ddb.send(new PutCommand({ TableName: PLAYERS_TABLE, Item: after }));

  // Safe to bump unconditionally: we only reach here once per player per
  // day, since a repeat call for the same date returns early above.
  await ddb.send(new UpdateCommand({
    TableName: DAILY_COUNTS_TABLE,
    Key: { date },
    UpdateExpression: "ADD #c :one",
    ExpressionAttributeNames: { "#c": "count" },
    ExpressionAttributeValues: { ":one": 1 },
  }));

  return json(200, statsPayload(after));
}

async function handleStats(event) {
  const playerId = event.queryStringParameters?.playerId;
  if (!playerId) return json(400, { error: "playerId query parameter is required." });

  const existing = await ddb.send(new GetCommand({ TableName: PLAYERS_TABLE, Key: { playerId } }));
  return json(200, statsPayload(existing.Item || emptyProfile(playerId)));
}

async function handleTodayCount(event) {
  const date = event.queryStringParameters?.date;
  if (!date) return json(400, { error: "date query parameter is required." });

  const existing = await ddb.send(new GetCommand({ TableName: DAILY_COUNTS_TABLE, Key: { date } }));
  return json(200, { date, count: existing.Item?.count || 0 });
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method;
  const path = event.rawPath;

  try {
    if (method === "POST" && path === "/result") return await handleResult(event);
    if (method === "GET" && path === "/stats") return await handleStats(event);
    if (method === "GET" && path === "/today-count") return await handleTodayCount(event);
    return json(404, { error: "Not found." });
  } catch (err) {
    console.error(err);
    return json(500, { error: "Internal error." });
  }
};
