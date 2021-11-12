import os
import json
import base64
from obs import ObsClient


def handler(event, context):

    endPoint = "obs.cn-north-1.myhuaweicloud.com"
    ak = "7QTIRKHZUKSBKZDHBGRR"
    sk = "BVAOYZjWPu8VbMLEGpFhpJalyTurE4PBudZBDJtR"
    bucketName = "lxy-bucket-input"


    TestObs = ObsClient(
        access_key_id=ak, secret_access_key=sk, server=endPoint)
    listresult = TestObs.listObjects(bucketName)
    print(event)
    print(context)
    inputdata = base64.b64decode(event['body'].encode('utf-8')).decode("utf-8")
    print(inputdata)
    res = TestObs.deleteObject(bucketName, inputdata)


    jsonResponse = {
        'statusCode': 200,
        'isBase64Encoded': False,
        'headers': {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Accept",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE"
        },
    }
    return json.dumps(jsonResponse)