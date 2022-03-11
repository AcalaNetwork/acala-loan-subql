# @acala-network/acala-loan-subql

## Cookbook

### 1. Query user's position  

#### **Property**

| property | desc |
| ----- | ----- |
| ownerId | the position's owner address |
| callateralId | the position's collateral id |
| depositAmount | the amount of collateral deposited in the position |
| debitAmount | the amount of debit issued in the position |
| updateAt | the timestamp when last update |
| updateAtBlockId | the block number when last update |


#### **Example**
```graphql
query {
  positions(filter:{ownerId:{equalTo:"25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr"}}) {
    nodes {
      ownerId
      collateralId
      depositAmount
      debitAmount
      updateAt
      updateAtBlockId
    }
  }
}
```

### 2. Query Collateral Information

#### **Property**

| property | desc |
| -- | -- |
| id | the name of the collateral token |
| decimals | the decimals of the collateral token |
| depositAmount | the total amount of collateral deposited in the kind of position |
| debitAmount | the total amount of debit issued in the kind of position |
| collateralParams | the params config of the kind of posiition |
| collateralParams.liquidtionRatio | liquidtionRation |
| collateralParams.liquidationPenalty | liquidationPenalty |
| collateralParams.maximumTotalDebitValue| maximumTotalDebitValue |
| collateralParams.requiredCollateralRatio | requiredfCollatearlRatio |
| collateralParams.interestRatePerSec | interestRatePerSec |

#### **Example**
```graphql
query {
  collaterals(filter:{id:{equalTo:"DOT"}}) {
    nodes {
      id
      decimals
      depositAmount
      debitAmount
      collateralParams {
        nodes {
          id,
          liquidationRatio
          liquidationPenalty
          maximumTotalDebitValue
          requiredCollateralRatio
          interestRatePerSec
          updateAt
          updateAtBlockId
        }
      }
    }
  }
} 
```

### 3. Query Collateral Params History

#### **Property**
| property | desc |
| -- | -- |
| liquidtionRatio | liquidtionRation |
| liquidationPenalty | liquidationPenalty |
| maximumTotalDebitValue| maximumTotalDebitValue |
| requiredCollateralRatio | requiredfCollatearlRatio |
| interestRatePerSec | interestRatePerSec |
| startAt | when the params start to use |
| startAtBlockId | which block height the params start to use |
| endAt | when the params end to use |
| endAtBlockId | which block height the params end to use (not include) |


#### **Example**
```graphql
query {
 collateralParamsHistories(filter:{collateralId:{equalTo:"DOT"}}) {
        nodes {
          id,
          liquidationRatio
          liquidationPenalty
          maximumTotalDebitValue
          requiredCollateralRatio
          interestRatePerSec
          startAt
          startAtBlockId
          endAt
          endAtBlockId
        }
      }
} 
```

4. Query the UpdatePosition action

#### **Property**
| property | desc |
| -- | -- |
| collateralId | collateral |
| ownerId | the owner's address |
| debitAdjustment | debit changed amount |
| collateralAdjustment | collateral changed amount |
| debitAdjustmentUSD | debit change value (USD) |
| collateralAdjustmentUSD | collateral change value (USD) |
| price | the collateral price at the action |
| extrinsic | the extrinsic hash |
| timestamp | the time of the event |
| blockId | the block id |

#### **Example**
```graphql
query {
  updatePositions(filter:{collateralId:{equalTo:"DOT"}} orderBy:TIMESTAMP_DESC) {
    nodes {
      id,
      collateralId
      ownerId
      debitAdjustment
      collateralAdjustment
      debitAdjustmentUSD
      collateralAdjustmentUSD
      price
      extrinsicId
      timestamp
      blockId
    }
  }
}
```

4. Query the CloseByDex action

#### **Property**
| property | desc |
| -- | -- |
| collateralId | collateral |
| ownerId | the owner's address |
| soldAmount | the amount of sold collaterals |
| refundAmount | the amount of refunded collateals |
| debitVolumeUSD | the amount of cleared debits |
| soldVolumeUSD | the USD vlaue of sold collaterals |
| refunedVolumeUSD | the USD vlaue of refunded collaterals |
| price | the collateral price at the action |
| extrinsic | the extrinsic hash |
| timestamp | the time of the event |
| blockId | the block id |

#### **Example**
```graphql
query {
  closeByDexes(filter:{collateralId:{equalTo:"DOT"}} orderBy:TIMESTAMP_DESC) {
    nodes {
      id,
      collateralId
      ownerId
      soldAmount
      debitVolumeUSD
     refundAmount
      soldVolumeUSD
      refundVolumeUSD
      price
      extrinsicId
      timestamp
      blockId
    }
  }
}
```


### 5.  Query ConfiscatePositions Actions
| property | desc |
| -- | -- |
| collateralId | collateral |
| ownerId | the owner's address |
| debitAdjustment | debit changed amount |
| collateralAdjustment | collateral changed amount |
| debitAdjustmentUSD | debit change value (USD) |
| collateralAdjustmentUSD | collateral change value (USD) |
| price | the collateral price at the action |
| extrinsic | the extrinsic hash |
| timestamp | the time of the event |
| blockId | the block id |

```graphql
query {
  confiscatePositions(filter:{collateralId:{equalTo:"DOT"}} orderBy:TIMESTAMP_DESC) {
    nodes {
      id,
      collateralId
      ownerId
      collateralAdjustment
      debitAdjustment
      collateralAdjustmentUSD
      debitAdjustmentUSD
      extrinsicId
      timestamp
      blockId
    }
  }
}
```