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
    objectresults = listresult['body']['contents'][:]
    result = []
    for i in range(0, len(objectresults)):
        print(objectresults[i]['key'])
        print(objectresults[i]['lastModified'])
        print(objectresults[i]['size'])
        result.append({'key': objectresults[i]['key'], 'time': objectresults[i]
                      ['lastModified'], 'size': objectresults[i]['size']})

    print(result)
    jsonArr = json.dumps(result, ensure_ascii=True)
    print(jsonArr)
    jsonResponse = {
        'statusCode': 200,
        'isBase64Encoded': True,
        'headers': {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Accept",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE"
        },
        'body': base64.b64encode(jsonArr.encode('utf-8')).decode("utf-8"),
    }
    print (jsonResponse)
    return json.dumps(jsonResponse)

