# chaotic-api
Simple API for resilience tests purposes.

A random index will be chosen based on the array below.
``` 
["DELAY", "SUCCESS", "ERROR"]
```

- ERROR returns the status code 500
- DELAY holds the response up to 10 seconds with status code 200
- SUCCESS return the status code 200
