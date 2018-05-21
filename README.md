
# Angular Issue 24024

When using `program.emit` in `ngtools api2` and having a clear typescript error, the error is no emitted. It is only emitted when using `noEmitOnError` flag, however it seems that the `noEmitOnError` is not being honoured as files are still being outputted.

This is to illustrate issue https://github.com/angular/angular/issues/24024

To view the issue:
```
npm i
npm run build
```