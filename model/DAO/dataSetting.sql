/********************************
* 	     Database Design        *
*         TEAM: KIMCHI          *
* first create by HoCheol, Nam  *
*       c.date: 2020.10.08      *
*   email: hcnam@dankook.ac.kr  *
*  dummy data insert script   
********************************/
/********************************
* edit by :                      
* date    :                      
* email   :                      
* comment :                      
*********************************/ 

##############################
select * from `kimchi`.`show_info`;
select * from `kimchi`.`actor`;
select * from `kimchi`.`show_actor`;
select * from `kimchi`.`director`;
select * from `kimchi`.`show_director`;
##############################

# 같은 파일에서 작업하기 때문에 항상 git pull 먼저 받고 작업할것
# 동시에 같은 파일을 수정하고 합치려고 할 경우 conflict가 발생하기 때문에 작업 시작한 인원은 작업시작을 알려주거나 겹치지 않도록 조율할것.
# 혹은 confic가 나지 않도록 조율해서 잘 merge 시킬것!
# 삽입시 괄호안에 데이터를 채워넎으면 됨. 괄호들을 콤마(,)로 이어나가며 마지막 삽입 데이터가 들어간 괄호 뒤에는 세미콜론(;) 넣을것
# 개행(줄바꿈)이 필요한 경우 <br>을 이용할것
# 수정시 아래의 표를 위에 붙여나가면서 수정내용 표시할것
# 예시
	/********************************
	* edit by :  남호철           
	* date    :  2020.11.19                
	* email   :  nhc616@gmail.com      
	* comment :  더미 데이터 삽입 참고 작성    
	*********************************/ 

insert into `kimchi`.`show_info`(`title`, `type`, `country`, `data_added`, `release_year`, `duration`, `poster`,`description`)
values 
# (제목, 장르, 국가, 개봉일(등록일), 년도, 상영시간, 포스터url, 설명)
('#살아있다', '드라마', '한국', '2020-06-24', 2020, '98분', 
'https://movie-phinf.pstatic.net/20200624_189/1592965781317Puv47_JPEG/movie_image.jpg', 
'원인불명 증세의 사람들의 공격에 통제 불능에 빠진 도시.<br>
 영문도 모른 채 잠에서 깬 ‘준우’(유아인)는 아무도 없는 집에 혼자 고립된 것을 알게 된다.<br>
 데이터, 와이파이, 문자, 전화 모든 것이 끊긴 채 고립된 상황.<br>
 연락이 두절된 가족에 이어 최소한의 식량마저 바닥이 나자 더 이상 버티기 힘들어진 ‘준우’.<br>
 하지만 그 순간 건너편 아파트에서 누군가 시그널을 보내온다.<br>
 또 다른 생존자 ‘유빈’(박신혜)이 아직 살아있음을 알게 된 ‘준우’는<br>
 함께 살아남기 위한 방법을 찾아 나서는데...!<br>
 <br>
 꼭 살아남아야 한다'); 
 
 insert into `kimchi`.`actor`(`name`,`birth`,`death`,`description`)
 values
 # (이름, 출생, 사망, 설명) 순서 
 ('유아인','','',
 '소속사 : United Artists Agency<br>
학력 : 건국대학교 예술학<br>
수상 : 2017년 한국패션사진작가협회 포토제닉상<br>
	  2016년 제16회 대한민국청소년영화제 인기영화인 남자배우<br>
	  2016년 제7회 대한민국 대중문화예술상 국무총리표창<br>
	  2016년 제52회 백상예술대상 TV부문 남자 최우수연기상<br>'),
('박신혜','1990년 2월 18일','',
'학력 : 중앙대학교 연극영화학<br>
데뷔 : 2003년 뮤직비디오 \'이승환 - 꽃\'<br>
수상 : 2017년 아시아 아티스트 어워즈 아시아 아이콘상<br>');
 
 /*
	select * from `kimchi`.`show_info`;
	select * from `kimchi`.`actor`;
	를 이용해 영화 번호(show_id)와 배우 번호(actor_id)를 매칭할것.
 */
 
insert into `kimchi`.`show_actor`
values
# (`show_id`, `actor_id`) 순서
(1, 1), # #살아있다 / 유아인
(1, 2); # #살아있다 / 박신혜

insert into `kimchi`.`director`(`name`,`birth`,`death`,`description`)
 values
 # (이름, 출생, 사망, 설명) 순서 
('조일형','','','');

insert into `kimchi`.`show_director`
 values
 # (`show_id`, `director_id`) 순서
 (1, 1); # #살아있다 / 조일형 
 