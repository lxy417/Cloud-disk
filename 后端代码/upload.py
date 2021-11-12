# -*- coding:utf-8 -*-
import os
import json
import base64
from obs import ObsClient


def handler(event, context):

    endPoint = "obs.cn-north-1.myhuaweicloud.com"
    ak = "7QTIRKHZUKSBKZDHBGRR"
    sk = "BVAOYZjWPu8VbMLEGpFhpJalyTurE4PBudZBDJtR"
    bucketName = "lxy-bucket-input"

    formParams = {}
    formParams['x-obs-acl'] = 'public-read'
    formParams['content-type'] = 'text/plain'

    TestObs = ObsClient(
        access_key_id=ak, secret_access_key=sk, server=endPoint)

    resp = TestObs.createPostSignature(expires=3600, formParams=formParams)

    mapx = {}
    mapx["policy"] = resp['policy']
    mapx["ak"] = ak
    mapx["signature"] = resp["signature"]

    print(resp['policy'])
    print(resp['signature'])
    jsonResponse = {
        'statusCode': 200,
        'isBase64Encoded': True,
        'headers': {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Accept",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE"
        },
        'body': base64.b64encode(json.dumps(mapx).encode('utf-8')).decode("utf-8")

    }
    return json.dumps(jsonResponse)