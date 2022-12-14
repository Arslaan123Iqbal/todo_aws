/* Amplify Params - DO NOT EDIT
	API_TODOAWS_GRAPHQLAPIIDOUTPUT
	API_TODOAWS_TODOCOUNTTABLE_ARN
	API_TODOAWS_TODOCOUNTTABLE_NAME
	API_TODOAWS_TODOTABLE_ARN
	API_TODOAWS_TODOTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var aws = require("aws-sdk");

var ddb = new aws.DynamoDB();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

async function getAllCounts(userId) {
  const queryParams = {
    TableName: process.env.API_TODOAWS_TODOCOUNTTABLE_NAME,
    ReturnConsumedCapacity: "TOTAL",
  };
  try {
    const result = await ddb.scan(queryParams).promise();
    let filteredItem = result.Items.filter((obj) => obj.userId.S === userId.S);
    if (filteredItem.length > 0) {
      await updateTodoCount(filteredItem);
    } else {
      await createNewTodoCount(userId);
    }
  } catch (err) {
    console.log("Error", err);
  }
}

async function updateTodoCount(items) {
  let params = {
    Key: {
      id: items[0].id,
    },
    UpdateExpression: "set todoCount = :c",
    ExpressionAttributeValues: {
      ":c": { N: sum(items[0].todoCount) },
    },

    TableName: process.env.API_TODOAWS_TODOCOUNTTABLE_NAME,
  };

  try {
    await ddb.updateItem(params).promise();
    console.log("Success");
  } catch (err) {
    console.log("Error", err);
  }
}

function sum(count) {
  return (Number(count.N) + 1).toString();
}

async function createNewTodoCount(userId) {
  let params = {
    Item: {
      id: { S: `${aws.util.uuid.v4()}` },
      userId: userId,
      todoCount: { N: "1" },
    },
    TableName: process.env.API_TODOAWS_TODOCOUNTTABLE_NAME,
  };
  try {
    const result = await ddb.putItem(params).promise();
    console.log("Success", result);
  } catch (err) {
    console.log("Error", err);
  }
}

exports.handler = async (event) => {
  console.log(
    "_______________running___________",
    event
  );
  if (event.Records[0].eventName === "INSERT") {
    console.log("in if");
    await getAllCounts(event.Records[0].dynamodb.NewImage.user);
  }

  /* await ddb.query(queryParams, function (err, data) {
    console.log("sssssss", data);
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Items);
      data.Items.forEach(function (element, index, array) {
        console.log(element.Title.S + " (" + element.Subtitle.S + ")");
      });
    }
  }); */
  /*   console.log(
    `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA   AAAA AAAAAA:`,
    event.Records[0].dynamodb.NewImage.owner
  );
 
  event.Records.forEach((record) => {
    // console.log(record.eventID);
    // console.log(record.eventName);
    // console.log('DynamoDB Record: %j', record.dynamodb);
  });
  return Promise.resolve("Successfully processed DynamoDB record");*/
};