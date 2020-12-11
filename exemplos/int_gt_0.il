.assembly extern mscorlib {}
.assembly _int_gt_0{}
.module _int_gt_0.exe

.class public _UNICA{

.method static public void _principal() {
  .entrypoint
  ldc.i8 0
  conv.r8
  .locals (int64 v1)
  conv.i8
  stloc v1
  r1:
  ldloc v1
  conv.r8
  ldc.i8 1
  conv.r8
  clt
  brfalse r2
  ldstr "digite um valor int: "
  call void [mscorlib]System.Console::Write(string)
  call string [mscorlib]System.Console::ReadLine()
  call int64 [mscorlib]System.Int64::Parse(string)
  stloc v1
  br r1
  r2:
  ldstr "valor lido maior que 0"
  call void [mscorlib]System.Console::Write(string)
  ret
}
}
