.assembly extern mscorlib {}
.assembly _codigo_objeto{}
.module _codigo_objeto.exe

.class public _UNICA{

.method static public void _principal() {
  .entrypoint
  .locals (int64 lado)
  ldstr "Digite um valor para lado: "
  call void [mscorlib]System.Console::Write(string)
  call string [mscorlib]System.Console::ReadLine()
  call int64 [mscorlib]System.Int64::Parse(string)
  stloc lado
  ldc.i8 0
  conv.r8
  .locals (int64 area)
  conv.i8
  stloc area
  ldloc lado
  conv.r8
  ldc.i8 0
  conv.r8
  cgt
  brfalse r1
  ldloc lado
  conv.r8
  ldloc lado
  conv.r8
  mul
  conv.i8
  stloc area
  r1:
  ldloc area
  conv.r8
  conv.i8
  call void [mscorlib]System.Console::Write(int64)
  ret
}
}
