# JS Dependency Licenses

 This utility will provide a CSV dump of dependencies and their licenses, given a list of
 package.json locations on your local machine.
 
 ## Instructions
 
 Update index.js to include a list of paths to package.json files. Note that the files must
 be on your local filesystem, then just run `node index.js`.
 
 ## Example
 
 Given the projects in the `example/` folder...
 ```
 > node index.js
Processing my-project/react@16.13.1
Processing another-project/express@4.17.1
express 4.17.1 MIT
Processing another-project/pg@8.3.3
react 16.13.1 MIT
Processing my-project/react-dom@16.13.1
pg 8.3.3 MIT
Processing another-project/typescript@4.0.2
react-dom 16.13.1 MIT
Processing my-project/react-router@5.2.0
react-router 5.2.0 MIT
Processing my-project/typescript@4.0.2
typescript 4.0.2 Apache-2.0
typescript 4.0.2 Apache-2.0

> cat output.csv
"key","name","version","license","usedBy"
"express_4.17.1","express","4.17.1","MIT","[""another-project""]"
"react_16.13.1","react","16.13.1","MIT","[""my-project""]"
"pg_8.3.3","pg","8.3.3","MIT","[""another-project""]"
"react-dom_16.13.1","react-dom","16.13.1","MIT","[""my-project""]"
"react-router_5.2.0","react-router","5.2.0","MIT","[""my-project""]"
"typescript_4.0.2","typescript","4.0.2","Apache-2.0","[""another-project"",""my-project""]"%                                        
```
