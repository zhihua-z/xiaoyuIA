# how does like work?

## 1. understanding its asynchronous pattern

```plantuml

actor User as U
participant "Web App" as WA
participant "Web Server" as WS
participant "Database" as DB

U -> WA: load discovery page
WA -> WS: retrieve post data http://localhost:8000/api/posts
note right: add user info here
WS -> DB: retrieve all the post this user can see
DB -> WS: list of posts
note right: like information is returned here
skinparam arrowcolor red
WS -> WS: find if this user liked those posts before
skinparam arrowcolor black
WS -> WS: sorting 
WS -> WA: send back the list of sorted posts
WA -> U: render and display page
note right: display heart or hearto according to liked info


```