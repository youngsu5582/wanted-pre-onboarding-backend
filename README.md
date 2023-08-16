# Wanted Pre Onboarding Backend

## Assignment URL
https://www.wanted.co.kr/events/pre_ob_be_6

## Assignment Github URL
https://github.com/lordmyshepherd-edu/wanted-pre-onboardung-backend-selection-assignment

## Framework


### Nest.js & Typescript
![Nest.js Badge](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white)

## Database

### Mysql
![MySQL Badge](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)


## API Requirements
- [ o ] 사용자 회원가입
- [ o ] 사용자 로그인
- [ o ] 새로운 게시글 생성
- [ o ] 게시글 목록 조회
- [ o ] 특정 게시글 조회
- [ o ] 특정 게시글 수정
- [ o ] 특정 게시글 삭제

=> 2023.08.10 프로토타입 완성

## Applicant Profile
### 이영수
https://www.notion.so/ea9c581cf4ff4b2fb953316a6cafef8c?pvs=4

## Application Execution

### Backend
1. git clone https://github.com/youngsu5582/wanted-pre-onboarding-backend.git
2. npm install
3. npx prisma migrate dev  
    3.1 .env 에 DATABASE_URL 를 넣어야 함. (.env.test 참조)
4. npx nestia swagger (swagger.json 생성)
5. npm run start

### Backend & Database in Docker
0. env 세팅  
    0.1 .env.development 에 DATABASE_URL를 넣어야 함. (.env.test 참조)  
    0.2 .database.env 에 정보를 넣어야 함. (.database.test.env 참조)  
1. docker-compose build
2. docker-compose up

=> http://localhost:8000/api-docs 에서 엔드포인트 확인 가능

### Backend & Database in AWS
- http://43.202.46.205:8000/
- AWS EC2 를 통해 Deploy
- EC2 내부에 , docker 를 install 하여 , container 를 통해 Deploy
( AWS ECS 를 통해 배포하려 했으나 , 오류로 포기)

## Database Base ERD

![ERD Image](<wanted-pre-onboarding-backend - User.png>)

## Demo Video Link

https://www.youtube.com/watch?v=spx_ThkY1gA

## 구현 설계 방침
- cqrs Pattern + DDD Pattern
- Domain 단위로 설계하여 , User 와 Post Module 로 코드 구성
- Database 를 Read 하는 Logic 은 Query 로 배치
- Database 를 Create/Update/Delete 하는 Logic 은 Command 로 배치
- nestia & prisma 를 사용하여 Type safe 하며 DTO 및 Response 오류 검증



## API Specification
- http://43.202.46.205:8000/api-docs
해당 swagger 문서 참조




