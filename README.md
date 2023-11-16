# Mind__Lab
# ⚙️ 환경변수


<aside>


**DBMS**: DBeaver 

1. **items or terminal** 중에 접속해서 **PostgreSQL** 를 **HomeBrew로** 설치 후 **PostgreSQL** 서버를 **ON**합니다.(on 후에 **createdb postgres** 명령어를 입력해주세요.)
2. **DBeaver** 설치 후 **커넥션**에 접속해서 **ENV**를 참고해서 연결합니다.

 ![스크린샷 2023-11-16 오전 10 06 02(2)](https://github.com/qndrl1004/Mind_Lab/assets/82863770/cbf71a92-7c24-4e8a-b178-093cd6aa29e5)

**OS**: macOS

**IDE**: VScode [yarn 명령어로 인스톨해주세요.]

**ENV**: 메일로 보내겠습니다.

**GitHub**: https://github.com/qndrl1004/Mind_Lab.git

**LINK**: [http://localhost:4000/graphql](http://localhost:4000/graphql) [서버키시고 들어가셔야 합니다!]


</aside>

---

# 🛠️기능구현

<aside>
💁‍♂️ [GraphQL Playground에서 QUERY VARIABLES에 JSON형태로 필요한 값을 가진 쿼리 변수를 제공해야 합니다.]

</aside>

## ♠︎설문지 CRUD♠︎

```graphql
1.모든 설문지 불러오기:
query {
  getAllSurveys {
    id
    title
    description
    questions {
      id
      content
      choices {
        id
        content
        score
      }
    }
  }
}

2.ID로 설문 조회:
query GetSurvey($id: Int!) {
  getSurvey(id: $id) {
    id
    title
    description
  }
}

3.설문 생성:
mutation CreateSurvey($input: SurveyInput!) {
  createSurvey(input: $input) {
    id
    title
    description
  }
}

4.설문 업데이트:
mutation UpdateSurvey($id: Int!, $input: SurveyInput!) {
  updateSurvey(id: $id, input: $input) {
    id
    title
    description
  }
}

5.설문 삭제:
mutation DeleteSurvey($id: Int!) {
  deleteSurvey(id: $id)
}
```

---

## ♣︎문항 CRUD♣︎

```graphql
1.문항 리스트 가져오기:
query GetQuestions {
  getQuestions {
    id
    content
    choices {
      id
      text
    }
    survey {
      id
      title
      description
    }
  }
}

2.ID로 문항 조회:
query GetQuestion($id: Int!) {
  getQuestion(id: $id) {
    id
    content
    choices {
      id
      text
    }
    survey {
      id
      title
      description
    }
  }
}

3.문항 생성:
mutation CreateNewQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    content
    survey {
      id
      title
      description
    }
  }
}

4.문항 업데이트:
mutation UpdateExistingQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
    id
    content
    survey {
      id
      title
      description
    }
  }
}

5.문항 삭제:
mutation DeleteExistingQuestion($id: Int!) {
  deleteQuestion(id: $id)
}
```

---

## ♥︎선택지 CRUD♥︎

```graphql
1.선택지 리스트 가져오기:
query GetChoices {
  getChoices {
    id
    content
    score
    question {
      id
      content
    }
  }
}

2.ID로 선택지 조회:
query GetChoice($id: Int!) {
  getChoice(id: $id) {
    id
    content
    score
    question {
      id
      content
    }
  }
}

3.선택지 생성:
mutation CreateChoice($input: CreateChoiceInput!) {
  createChoice(input: $input) {
    id
    content
    score
    question {
      id
      content
    }
  }
}

4.선택지 업데이트:
mutation UpdateChoice($input: UpdateChoiceInput!) {
  updateChoice(input: $input) {
    id
    content
    score
    question {
      id
      content
    }
  }
}

5.선택지 삭제:
mutation DeleteChoice($id: Int!) {
  deleteChoice(id: $id)
}
```

---

## ♦︎답변 CRUD♦︎

```graphql

1.선택지에 대한 답변을 업데이트:
mutation CreateOrUpdateAnswer($input: CreateOrUpdateAnswerInput!) {
  createOrUpdateAnswer(input: $input) {
    id
    choice {
      id
      content
      score
    }
    question {
      id
      content
    }
    survey {  
      id
      title
      description
    }
  }
}

2.설문 조사에 대한 총 점수:
query GetSurveyTotalScore($surveyId: Int!) {
  getSurveyTotalScore(surveyId: $surveyId)
}

3.설문지 완료 확인:
query IsSurveyCompleted($surveyId: Int!) {
  isSurveyCompleted(surveyId: $surveyId)
}

4.완료된 설문지 목록을 가져오기:
query GetCompletedSurvey($surveyId: Int!) {
  getCompletedSurvey(surveyId: $surveyId) {
   id
    choice {
      id
      content
      score
    }
    question {
      id
      content
    }
    survey {  
      id
      title
      description
    }
  }
}
```

---

### 사용한 라이브러리★

```json
"dependencies": {
    "@apollo/server": "^4.9.5",
    "@nestjs/apollo": "^12.0.11",
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/graphql": "^12.0.10",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "dotenv": "^16.3.1",
    "graphql": "^16.8.1",
    "graphql-tools": "^9.0.0",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "type-graphql": "^1.1.1",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
```

---

### ERD📊
![postgres](https://github.com/qndrl1004/Mind_Lab/assets/82863770/33a0bd40-2848-4f78-8694-8f04e3cc8c40)

