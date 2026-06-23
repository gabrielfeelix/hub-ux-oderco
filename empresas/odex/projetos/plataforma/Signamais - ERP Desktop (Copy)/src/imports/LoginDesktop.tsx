import svgPaths from "./svg-sg9wwkzqp";

function Group() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%-305px)] top-[calc(50%+2.2px)]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[919px] left-[calc(50%-305px)] mix-blend-overlay top-[calc(50%+2.2px)] w-[1920px]" data-name="Grid">
        <div className="absolute inset-[-0.11%_-0.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1922 921">
            <g id="Grid" style={{ mixBlendMode: "overlay" }}>
              <path d={svgPaths.p5a7d080} stroke="url(#paint0_radial_5_8896)" strokeOpacity="0.7" strokeWidth="2" />
            </g>
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="translate(961 460.5) rotate(90) scale(459.5 960)" gradientUnits="userSpaceOnUse" id="paint0_radial_5_8896" r="1">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="backdrop-blur-[2px] bg-gradient-to-r content-stretch flex from-[rgba(255,255,255,0.2)] items-center justify-center px-[16px] py-[8px] relative rounded-[10000px] shrink-0 to-[rgba(153,153,153,0.2)]" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.6)] border-solid inset-0 pointer-events-none rounded-[10000px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-white">Voltar</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Button />
    </div>
  );
}

function LogoSignaBranca() {
  return (
    <div className="h-[39.599px] relative shrink-0 w-[148px]" data-name="Logo Signa Branca">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 148 39.5985">
        <g id="Logo Signa Branca">
          <g id="Group">
            <path d={svgPaths.p2d08800} fill="var(--fill-0, #FCF7F8)" id="Vector" />
            <path d={svgPaths.p2f0f8380} fill="var(--fill-0, #FCF7F8)" id="Vector_2" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.p32f29000} fill="var(--fill-0, #FCF7F8)" id="Vector_3" />
            <path d={svgPaths.p1f0217c0} fill="var(--fill-0, #FCF7F8)" id="Vector_4" />
            <path d={svgPaths.p2763ad00} fill="var(--fill-0, #FCF7F8)" id="Vector_5" />
            <path d={svgPaths.p15d27980} fill="var(--fill-0, #FCF7F8)" id="Vector_6" />
          </g>
          <path d={svgPaths.p1a078000} fill="var(--fill-0, #FCF7F8)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-center pr-[308px] relative shrink-0 w-[1235px]">
      <LogoSignaBranca />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex h-[39.599px] items-start left-[50px] top-[64px] w-[1820px]">
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Underline() {
  return <div className="h-[67.583px] w-[398.124px]" data-name="Underline_06" />;
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="bg-clip-text flex-[1_0_0] font-['Lufga:ExtraBold_Italic',sans-serif] leading-[64px] min-h-px min-w-px not-italic relative text-[44px] whitespace-pre-wrap" style={{ backgroundImage: "linear-gradient(180.447deg, rgb(255, 255, 255) 17.893%, rgb(234, 234, 234) 92.668%, rgb(153, 153, 153) 154.85%)", WebkitTextFillColor: "transparent" }}>
        Boas-vindas de volta!
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame8 />
      <p className="font-['Lufga:SemiBold',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[20px] text-white w-full whitespace-pre-wrap">
        <span className="leading-[normal] text-[rgba(255,255,255,0.7)]">Ainda não tem uma conta?</span>
        <span className="leading-[normal]">{` Cadastre-se`}</span>
      </p>
    </div>
  );
}

function AccountCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="account_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="account_circle">
          <mask height="24" id="mask0_5_8908" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_5_8908)">
            <path d={svgPaths.p8ea680} fill="var(--fill-0, #858A8E)" id="account_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <AccountCircle />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#abafb2] text-[16px] whitespace-pre-wrap">exemplo@email.com</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[16px] relative size-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input1 />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full whitespace-pre-wrap">E-mail</p>
      <Frame4 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 343">
          <path d={svgPaths.p2918c000} fill="var(--fill-0, #858A8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MdiEye() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:eye">
          <path d={svgPaths.p18385b00} fill="var(--fill-0, #858A8E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <Frame18 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#abafb2] text-[16px] whitespace-pre-wrap">******</p>
      <MdiEye />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[16px] py-[16px] relative size-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input3 />
    </div>
  );
}

function Input2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full whitespace-pre-wrap">Senha</p>
      <Frame5 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[216.5px]">
      <Frame1 />
      <p className="font-['Lufga:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-right text-white">Lembrar</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame16 />
      <p className="font-['Lufga:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-right text-white">Esqueceu a senha?</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-full">
      <Input2 />
      <Frame15 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Input />
      <Frame14 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-gradient-to-r from-[#3f1168] h-[56px] relative rounded-[16px] shrink-0 to-[#6514ae] w-full" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#b970fa] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative size-full">
          <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-white">Entrar</p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start justify-center relative shrink-0 w-full">
      <Frame17 />
      <Button1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[344px] px-[24px] py-[25px] rounded-[10px] top-[162px] w-[516px]">
      <div className="absolute flex h-[112.015px] items-center justify-center left-[158px] mix-blend-soft-light top-[60.4px] w-[403.204px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[-6.47deg]">
          <Underline />
        </div>
      </div>
      <Frame7 />
      <Frame11 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col font-['Lufga:SemiBold',sans-serif] gap-[16px] items-start not-italic relative shrink-0 text-center whitespace-pre-wrap">
      <p className="leading-[64px] relative shrink-0 text-[#3f1168] text-[50px] w-[423px]">Controle de Documentos</p>
      <p className="leading-[40px] relative shrink-0 text-[#858a8e] text-[20px] w-[424px]">Transforme o processo de assinatura de documentos em uma experiência simples e moderna. Centralize contratos, acompanhe status em tempo real e garanta validade jurídica em cada envio.</p>
    </div>
  );
}

function FaSolidAngleLeft() {
  return (
    <div className="h-[59px] relative shrink-0 w-[30px]" data-name="fa-solid:angle-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 59">
        <g id="fa-solid:angle-left">
          <path d={svgPaths.pcdfd840} fill="var(--fill-0, #3F1168)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function FaSolidAngleLeft1() {
  return (
    <div className="h-[59px] relative w-[30px]" data-name="fa-solid:angle-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 59">
        <g id="fa-solid:angle-left">
          <path d={svgPaths.pcdfd840} fill="var(--fill-0, #3F1168)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[550px]">
      <FaSolidAngleLeft />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <FaSolidAngleLeft1 />
        </div>
      </div>
    </div>
  );
}

function FreepikBackgroundSimpleInject() {
  return (
    <div className="absolute inset-[8.44%_4.31%_8.23%_2.76%]" data-name="freepik--background-simple--inject-86">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 284.367 255.003">
        <g id="freepik--background-simple--inject-86">
          <path d={svgPaths.p2c8a1f00} fill="url(#paint0_linear_5_8904)" id="Vector" />
          <path d={svgPaths.p2c8a1f00} fill="var(--fill-0, white)" fillOpacity="0.72" id="Vector_2" opacity="0.32" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5_8904" x1="142.183" x2="142.183" y1="1.14441e-05" y2="255.003">
            <stop stopColor="#341154" />
            <stop offset="1" stopColor="#942DEF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function FreepikPageInject() {
  return (
    <div className="absolute inset-[15.73%_6.31%_16.85%_45.67%]" data-name="freepik--Page--inject-86">
      <div className="absolute inset-[-0.24%_0_0_-0.34%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147.423 206.787">
          <g id="freepik--Page--inject-86">
            <path d={svgPaths.p35f38200} fill="var(--fill-0, #263238)" id="Vector" />
            <path d={svgPaths.p1dbfc100} fill="var(--fill-0, white)" id="Vector_2" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p213230f1} fill="var(--fill-0, white)" id="Vector_3" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p3c227970} fill="var(--fill-0, white)" id="Vector_4" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p39f6c580} fill="var(--fill-0, white)" id="Vector_5" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.54045 32.6973H136.841" id="Vector_6" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.54045 44.2702H136.841" id="Vector_7" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1ec85680} fill="var(--fill-0, white)" id="Vector_8" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.54045 80.7332H136.841" id="Vector_9" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.54045 92.3061H136.841" id="Vector_10" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66409 23.5724H24.5088" id="Vector_11" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M89.4726 23.5724H105.317" id="Vector_12" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66409 14.9799H24.5088" id="Vector_13" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M94.7419 14.9799H110.587" id="Vector_14" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66409 35.0229H24.5088" id="Vector_15" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66409 47.6179H24.5088" id="Vector_16" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M57.5996 47.6179H73.4382" id="Vector_17" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M55.0476 13.6458H86.7308" id="Vector_18" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M55.0476 16.8894H86.7308" id="Vector_19" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M51.8529 54.4662H59.0378" id="Vector_20" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60.831 54.4662H68.0159" id="Vector_21" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M69.809 54.4662H76.9939" id="Vector_22" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p3ee7b280} fill="var(--fill-0, white)" id="Vector_23" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p5ef216a} id="Vector_24" stroke="var(--stroke-0, #3F1168)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.54045 125.177H136.841" id="Vector_25" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.54045 136.75H136.841" id="Vector_26" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66409 116.052H24.5088" id="Vector_27" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M89.4726 116.052H105.317" id="Vector_28" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66409 127.502H24.5088" id="Vector_29" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66409 140.097H24.5088" id="Vector_30" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M57.5996 140.097H73.4382" id="Vector_31" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M51.8529 146.945H59.0378" id="Vector_32" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60.831 146.945H68.0159" id="Vector_33" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M69.809 146.945H76.9939" id="Vector_34" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.65553 72.4222H46.9141" id="Vector_35" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.65553 84.5398H32.5504" id="Vector_36" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M67.563 84.5398H90.4579" id="Vector_37" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M103.481 99.8092H126.376" id="Vector_38" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M98.5424 84.5398H121.437" id="Vector_39" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1d705500} id="Vector_40" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M66.2166 99.8092H89.1115" id="Vector_41" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p670f0a0} id="Vector_42" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28.958 99.8092H51.8529" id="Vector_43" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p18071980} id="Vector_44" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M121.235 156.817H136.248" id="Vector_45" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M61.651 156.817H119.301" id="Vector_46" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24.5088 156.817H59.913" id="Vector_47" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.40949 156.817H23.1501" id="Vector_48" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M103.438 160.299H136.248" id="Vector_49" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40.7574 160.299H101.89" id="Vector_50" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.40949 160.299H38.8234" id="Vector_51" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M111.951 163.782H136.248" id="Vector_52" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M59.7171 163.782H110.599" id="Vector_53" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M29.925 163.782H57.006" id="Vector_54" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.40949 163.782H28.1808" id="Vector_55" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M125.299 167.264H136.248" id="Vector_56" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.6042 167.264H123.365" id="Vector_57" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.40949 167.264H14.0619" id="Vector_58" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M127.814 170.746H136.248" id="Vector_59" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M100.923 170.746H126.076" id="Vector_60" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M59.7171 170.746H99.5706" id="Vector_61" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.2162 170.746H58.1688" id="Vector_62" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.40949 170.746H19.0864" id="Vector_63" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M121.046 174.228H136.248" id="Vector_64" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M72.2937 174.228H118.916" id="Vector_65" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40.7574 174.228H69.7784" id="Vector_66" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.40949 174.228H38.8234" id="Vector_67" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M98.7933 177.717H136.248" id="Vector_68" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24.5088 177.717H96.0883" id="Vector_69" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.40949 177.717H22.379" id="Vector_70" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.75588 188.243H24.9188" id="Vector_71" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M88.6647 188.243H104.828" id="Vector_72" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28.958 188.243H83.2791" id="Vector_73" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M109.314 188.243H135.801" id="Vector_74" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p166a94c0} id="Vector_75" stroke="var(--stroke-0, #3F1168)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1cb5cd00} id="Vector_76" stroke="var(--stroke-0, #3F1168)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p30932180} id="Vector_77" stroke="var(--stroke-0, #3F1168)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p61530c0} id="Vector_78" stroke="var(--stroke-0, #3F1168)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p21967900} id="Vector_79" stroke="var(--stroke-0, #3F1168)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2ed9900} id="Vector_80" stroke="var(--stroke-0, #3F1168)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FreepikCharacterInject() {
  return (
    <div className="absolute inset-[29.92%_39.56%_10.23%_5.16%]" data-name="freepik--Character--inject-86">
      <div className="absolute inset-[-0.27%_-0.3%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 170.15 184.134">
          <g id="freepik--Character--inject-86">
            <path d={svgPaths.p11c30a00} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p216f5df0} fill="var(--fill-0, white)" id="Vector_2" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p38f715f0} fill="var(--fill-0, #263238)" id="Vector_3" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p38dcf580} fill="var(--fill-0, white)" id="Vector_4" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2ab97100} fill="var(--fill-0, white)" id="Vector_5" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p253b6070} fill="var(--fill-0, #3F1168)" id="Vector_6" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2d2bbe00} id="Vector_7" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2675c600} id="Vector_8" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2a6be680} id="Vector_9" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p29d3cec0} id="Vector_10" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p23df6b00} id="Vector_11" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p94f3780} id="Vector_12" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p3694ba60} id="Vector_13" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p139ece00} id="Vector_14" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p8868a80} fill="var(--fill-0, #B0B0B0)" id="Vector_15" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p16787100} fill="var(--fill-0, #263238)" id="Vector_16" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p23089380} fill="var(--fill-0, #B0B0B0)" id="Vector_17" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p3cb8c400} fill="var(--fill-0, #263238)" id="Vector_18" />
            <path d={svgPaths.p1df18480} id="Vector_19" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p15386580} id="Vector_20" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1f53b230} fill="var(--fill-0, #263238)" id="Vector_21" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <g id="Vector_22">
              <path d={svgPaths.p69472c0} fill="var(--fill-0, #B0B0B0)" />
              <path d={svgPaths.p69472c0} stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g id="Vector_23">
              <path d={svgPaths.p39a71900} fill="var(--fill-0, #B0B0B0)" />
              <path d={svgPaths.p39a71900} stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g id="Vector_24">
              <path d={svgPaths.p22de2380} fill="var(--fill-0, #3F1168)" />
              <path d={svgPaths.p22de2380} stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d={svgPaths.p11e2ac00} fill="var(--fill-0, white)" id="Vector_25" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p9641a80} fill="var(--fill-0, white)" id="Vector_26" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p4d27f00} fill="var(--fill-0, white)" id="Vector_27" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.paafc00} fill="var(--fill-0, white)" id="Vector_28" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p12e9d4f0} fill="var(--fill-0, #3F1168)" id="Vector_29" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p135a2300} fill="var(--fill-0, #B0B0B0)" id="Vector_30" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <g id="Vector_31">
              <path d={svgPaths.pa0d6680} fill="var(--fill-0, white)" />
              <path d={svgPaths.pa0d6680} stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g id="Vector_32">
              <path d={svgPaths.p1e2bcfc0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1e2bcfc0} stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d={svgPaths.p27e33600} id="Vector_33" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p49b5500} fill="var(--fill-0, #3F1168)" id="Vector_34" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p9806df0} fill="var(--fill-0, #B0B0B0)" id="Vector_35" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p14b644c0} fill="var(--fill-0, #B0B0B0)" id="Vector_36" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.pc925500} fill="var(--fill-0, #B0B0B0)" id="Vector_37" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p243bd600} fill="var(--fill-0, #B0B0B0)" id="Vector_38" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FillOutBro() {
  return (
    <div className="overflow-clip relative shrink-0 size-[306px]" data-name="Fill out-bro 1">
      <FreepikBackgroundSimpleInject />
      <FreepikPageInject />
      <FreepikCharacterInject />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[12px] relative shrink-0 w-[69px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69 12">
        <g id="Frame 344">
          <circle cx="6" cy="6" fill="var(--fill-0, #3F1168)" id="Ellipse 4" r="6" />
          <circle cx="25" cy="6" fill="var(--fill-0, #F5EAFE)" id="Ellipse 5" r="6" />
          <circle cx="44" cy="6" fill="var(--fill-0, #F5EAFE)" id="Ellipse 6" r="6" />
          <circle cx="63" cy="6" fill="var(--fill-0, #F5EAFE)" id="Ellipse 7" r="6" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-[550px]">
      <Frame21 />
      <Frame20 />
      <FillOutBro />
      <Frame19 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute bg-white content-stretch flex items-center left-[1233px] px-[43px] py-[44px] top-[45px]">
      <Frame />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-gradient-to-b from-[#10011e] h-[914.599px] relative shrink-0 to-[#290f41] w-full">
      <Group />
      <Frame9 />
      <Frame6 />
      <Group1 />
      <div className="absolute left-[170px] size-[829px] top-[-698px]">
        <div className="absolute inset-[-42.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1531 1531">
            <g filter="url(#filter0_f_5_8766)" id="Ellipse 3" opacity="0.23">
              <circle cx="765.5" cy="765.5" fill="var(--fill-0, white)" r="414.5" />
              <circle cx="765.5" cy="765.5" r="414" stroke="var(--stroke-0, black)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1531" id="filter0_f_5_8766" width="1531" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_5_8766" stdDeviation="175.5" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function LoginDesktop() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Login - Desktop">
      <Frame10 />
    </div>
  );
}