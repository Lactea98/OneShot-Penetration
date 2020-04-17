# OneShot-Penetration

Web application scanner.

![images](https://img.shields.io/badge/ubuntu-18.04-red) ![image](https://img.shields.io/badge/docker-19.03.8-blue) ![images](https://img.shields.io/badge/docker--compose-1.23.2-blue) ![images](https://img.shields.io/badge/apache2-2.4.29-blue) ![iamges](https://img.shields.io/badge/php-7.0-blue) ![images](https://img.shields.io/badge/python-3.6-blue)

![image](https://user-images.githubusercontent.com/38517436/79089046-97d72780-7d7f-11ea-9e5a-590ba5d656d1.png)

### # What is it?

If you start bug bounty, you will maybe use so many auto vulnerability scan tools.

When you use auto vulnerability scan tools, you have to input command scan tools' option.

This is so annoying, so I made a OneShot-penetration using web application.

### # Functions

Fucntions include:

```
Subdomain Scanner
Http request smuggling Scanner
aws bucket scanner
(And developing..)
```

##### 1. Subdomain Scanner

This function scans to find sub-domain of target host.

< Example >

Input
```
lactea.kr
```

Output
```
git.lactea.kr
project.lactea.kr
...
```

##### 2. Http request smuggling Scanner

This function scans to find http request smuggling vulnerability of target host.

< Example >

Input 
```
target-host.com
```

Output
```
[*] Server using CLTE
>> 
====== payload ======
POST / HTTP/1.1
Host: ac9f1faa1f71d93b807b054000660013.web-security-academy.net
Content-Length: 4
Transfer-Encoding: chunked

0


======================
```


##### 3. aws bucket scanner

This function scans if HTML code of teraget host is included aws bucket url or not.



### # External Library Lists

| Library Name  | Comments  | Link |
| ------------ | ------------ | ------------ |
| smuggler.py  | Scannig HTTP request smuggling  | https://github.com/Lactea98/smuggler.py |
| assetfinder |  Scanning sub domain | https://github.com/tomnomnom/assetfinder |
| gf  | Useful searching pattern  | https://github.com/tomnomnom/gf |
| meg | Tool for fetching lots of URLs | https://github.com/tomnomnom/meg |
| httprob | Take a list of domains and probe for working http and https servers. | https://github.com/tomnomnom/httprobe |

### # Update List

[*] v 1.0

[*] v 1.1 (2020.04.14)

[Bugs fix]

- If user select multi options, the bug fix that only first option operates.
- If user input multi hosts, the bug fix that only first option operates.
- And etc bug fix.
 
[*] v 1.2 (2020.04.17)

[Updates]

- Appended gf's s3-buckets pattern. Get more detail s3 bucket urls.

```
[a-z0-9-]+\\.s3-[a-z0-9-]+\\.amazonaws\\.com/[a-z0-9._-]+
[a-z0-9-]+\\.s3-[a-z0-9-]+\\.amazonaws\\.com
```

- User can show to check that s3 buckets can be overwritten or not.

- User can check current version on main page.

### Date

2020.04.06 ~ Developing..