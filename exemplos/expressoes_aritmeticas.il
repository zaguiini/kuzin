.assembly extern mscorlib {}
.assembly _expressoes_aritmeticas{}
.module _expressoes_aritmeticas.exe

.class public _UNICA{

.method static public void _principal() {
  .entrypoint
  ldstr "expressoes aritmeticas: "
  call void [mscorlib]System.Console::Write(string)
  ldc.i8 3
  conv.r8
  ldc.i8 4
  conv.r8
  add
  conv.i8
  call void [mscorlib]System.Console::Write(int64)
  ldstr " "
  call void [mscorlib]System.Console::Write(string)
  ldc.r8 2.3
  ldc.i8 2
  conv.r8
  mul
  call void [mscorlib]System.Console::Write(float64)
  ldstr " "
  call void [mscorlib]System.Console::Write(string)
  ldc.i8 5
  conv.r8
  ldc.i8 2
  conv.r8
  div
  conv.i8
  call void [mscorlib]System.Console::Write(int64)
  ldstr " "
  call void [mscorlib]System.Console::Write(string)
  ldc.i8 5
  conv.r8
  ldc.i8 2
  conv.r8
  rem
  conv.i8
  call void [mscorlib]System.Console::Write(int64)
  ldstr "\n"
  call void [mscorlib]System.Console::Write(string)
  ret
}
}
