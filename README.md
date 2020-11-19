# DB_DESIGN
![logo](https://user-images.githubusercontent.com/43805697/96088087-dd77d700-0eff-11eb-958f-80ce158b6ccf.png)
- 2020 단국대학교 DB 설계 프로젝트<br>
- Team : SCENE kimchi (2조)<br>
member: 김영훈, 김학재, 남호철, 안석진, 윤지아<br>

## environment
### Windows
  in windows env.
  - MySQL 8.0 ([download](https://nodejs.org/))
  - Node.js v12.19.0 ([download](https://nodejs.org/))
  - npm v6.14.8 (will automatically install with nodejs)
### Linux
  in linux env.
  > sudo apt-get update<br>
  > sudo apt-get install mysql-server<br>
  > sudo apt-get install nodejs<br>
  > sudo apt-get install build-essential<br>

## install
### DB Setting
- User Setting <br>
  make user for project with
  > create user 'dbdesign'@'%' identified with mysql_native_password BY 'P@ssw0rd'; <br>
  grant all privileges on *.* to 'dbdesign'@'%';
  
  on root or other user in MySQL who have privileges.<br>
  user id = dbdesign, pw = P@ssw0rd<br>
  MySQL uses default port(3306)
  
- DB Scheme Setting
  on mysql shell run script by
  > mysql> source <PROJECT_PATH>/model/DAO/dbSetting.sql<br>
  > mysql> source <PROJECT_PATH>/model/DAO/dataSetting.sql

### Run node.js Server
  - package install<br>
    first install npm packages with package.json
    > npm install
  
  - run node server<br>
    just run server with
    > node ./app.js
    
    but if you are developer and want to realtime modification on source code.
    > supervisor ./app.js
    
    or if on deployment start and stop server with
    > forever start ./app.js<br>
    forever stop ./app.js
    
  - connect with web browser<br>
    This project using prot 3000 on node server.<br>
    in yout brower vou can go index page with <br>
    "http://localhost:3000" or "http://127.0.0.1:3000"

## screenshot
![image](https://user-images.githubusercontent.com/43805697/98511972-e5c9f480-22a8-11eb-8fea-ac13d3f4ef89.png)
