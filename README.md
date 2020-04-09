# OneShot-Penetration
OneShot-Penetration

### What is it?
buy bounty를 할때 여러 가지 툴을 사용하게 됩니다.
그 중, 필자는 aws bucket takeover 취약점과 http request smuggling 취약점 툴을 사용하는데,
이를 자동화 시키기 위해 개발 하게 되었습니다.

### Functions

기능은 아래와 같습니다.

`
Subdomain Scan (Completed)
Port Scan (Developing)
Http request smuggling Scan (Completed)
S3 Scan (Developing)
`

- Subdomain Scan
이 기능은 메인 호스트에서 서브 도메인을 찾는 기능입니다.

- Port Scan
이 기능은 해당 호스트의 Port 를 Scan 합니다.
현재는 개발 중입니다.

- Http request smuggling Scan
이 기능은 타깃 서버가 Http request smuggling 공격에 취약한지 테스트 하는
기능을 가지고 있습니다.

- S3 Scan
이 기능은 해당 웹 페이지에 aws bucket을 스캔하여 takeover가 가능한지를 스캔하는
기능을 가지고 있습니다.
현재는 개발 중 입니다.


### Date
2020.04.06 ~ 