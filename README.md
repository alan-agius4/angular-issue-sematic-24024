
# Angular Issue 24010

I noticed that the compiler host method `moduleNameToFileName` is being invoked for modules which are not being imported or exported, and is not invoked with modules that are being imported.

This is to illustrate issue https://github.com/angular/angular/issues/24010

To view the issue:
```
npm i
npm run build
```