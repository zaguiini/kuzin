.assembly extern mscorlib {}
.assembly _codigo_objeto{}
.module _codigo_objeto.exe

.class public _UNICA{

.method static public void _principal() {
  .entrypoint
  .locals (int64 v1)
  ldstr "digite um valor int: "
  call void [mscorlib]System.Console::Write(string)
  call string [mscorlib]System.Console::ReadLine()
  call int64 [mscorlib]System.Int64::Parse(string)
  stloc v1
  .locals (int64 v2)
  ldstr "digite um valor int: "
  call void [mscorlib]System.Console::Write(string)
  call string [mscorlib]System.Console::ReadLine()
  call int64 [mscorlib]System.Int64::Parse(string)
  stloc v2
  ldloc v1
  conv.r8
  ldloc v2
  conv.r8
  cgt
  brfalse r1
  ldstr "v1 maior que v2"
  .locals (string msg)
  stloc msg
  br r2
  r1:
  ldloc v1
  conv.r8
  ldloc v2
  conv.r8
  clt
  brfalse r3
  ldstr "v1 menor que v2"
  stloc msg
  br r4
  r3:
  ldstr "v1 igual a v2"
  stloc msg
  r4:
  r2:
  ldloc msg
  call void [mscorlib]System.Console::Write(string)
  ret
}
}
