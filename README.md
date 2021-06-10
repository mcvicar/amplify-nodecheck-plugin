# 👋  The Amplify Node Checker Plugin 👋
This is a simple plugin to check your javascript syntax before it gets pushed/published.

It'll try to find all your JS files in backend/function/\*/src and run node --check e.g. `node --check amplify/backend/function/*/src/*.js` as part of a 'pre-push'.

### Why do this?

Because on more than one occasion I've made a change, pushed it to an environment and it has broken something because I stupidly missed a `)`.
