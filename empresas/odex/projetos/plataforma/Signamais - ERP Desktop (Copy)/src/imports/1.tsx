import svgPaths from "./svg-ng61139mng";
import imgEllipse1 from "figma:asset/1902ba06672519f971ac923a51533059e64328e2.png";
import imgHttpsLottiefilesComAnimationsCelebrationConfettiJsonQIroMtQ1Or from "figma:asset/26fce7b488f0723c693a9ddf43d5fc743bf5dba7.png";

function Roxo() {
  return (
    <div className="h-[39px] relative shrink-0 w-[26px]" data-name="roxo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 39">
        <g clipPath="url(#clip0_4_6413)" id="roxo">
          <path d={svgPaths.p354ced40} fill="var(--fill-0, #252529)" id="Vector" />
          <path d={svgPaths.p27000000} fill="var(--fill-0, #252529)" id="Vector_2" />
          <g id="Group">
            <path d={svgPaths.p20b7d500} fill="var(--fill-0, #3B1458)" id="Vector_3" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_6413">
            <rect fill="white" height="39" width="26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Contract() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="contract">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="contract">
          <mask height="24" id="mask0_3_1445" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_1445)">
            <path d={svgPaths.pb850280} fill="var(--fill-0, #531788)" id="contract_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Contract />
    </div>
  );
}

function MenuButton() {
  return (
    <div className="bg-[#f5eafe] content-stretch flex items-center justify-between p-[16px] relative rounded-[16px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)] shrink-0" data-name="menu button">
      <Frame22 />
    </div>
  );
}

function Contract1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="contract">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="contract">
          <mask height="24" id="mask0_3_1439" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_1439)">
            <path d={svgPaths.pb850280} fill="var(--fill-0, #34393E)" id="contract_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Contract1 />
    </div>
  );
}

function MenuButton1() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="menu button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
      <MenuButton />
      <MenuButton1 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <div className="absolute inset-[-5%]">
          <img alt="" className="block max-w-none size-full" height="44" src={imgEllipse1} width="44" />
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[16px] shrink-0" data-name="profile">
      <Frame21 />
    </div>
  );
}

function ArrowForward() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_forward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_forward">
          <mask height="24" id="mask0_4_6399" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6399)">
            <path d={svgPaths.p472ad40} fill="var(--fill-0, #34393E)" id="arrow_forward_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ArrowForward />
    </div>
  );
}

function MenuButton2() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="menu button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Profile />
      <MenuButton2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col h-[980px] items-center justify-between relative shrink-0">
      <Roxo />
      <Frame19 />
      <Frame20 />
    </div>
  );
}

function SideBar() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1234px] items-center px-[24px] py-[50px] relative shrink-0" data-name="side bar">
      <div aria-hidden="true" className="absolute border-[#edeeee] border-r border-solid inset-0 pointer-events-none" />
      <Frame />
    </div>
  );
}

function ArrowForward1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow_forward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow_forward">
          <mask height="16" id="mask0_3_3082" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_3_3082)">
            <path d={svgPaths.p31499900} fill="var(--fill-0, #8925E2)" id="arrow_forward_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="breadcrumb">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#cf9dfc] text-[14px]">Documentos</p>
      <ArrowForward1 />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[14px]">Novo Envelope</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[2.78%_-3.47%_12.47%_-3.47%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 308 208.462">
        <g id="Group">
          <path d={svgPaths.p13355c80} fill="var(--fill-0, #E0E0E0)" id="Vector" />
          <path d={svgPaths.p8c22300} fill="var(--fill-0, #E0E0E0)" id="Vector_2" />
          <path d={svgPaths.p3f8cf070} fill="var(--fill-0, #E0E0E0)" id="Vector_3" />
          <path d={svgPaths.p1b75d900} fill="var(--fill-0, #E0E0E0)" id="Vector_4" />
          <path d={svgPaths.p1d2cad00} fill="var(--fill-0, #E0E0E0)" id="Vector_5" />
          <path d={svgPaths.p11a9e100} fill="var(--fill-0, #E0E0E0)" id="Vector_6" />
          <path d={svgPaths.p2cbe9400} fill="var(--fill-0, #E0E0E0)" id="Vector_7" />
          <path d={svgPaths.p1bc3e000} fill="var(--fill-0, #E0E0E0)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[2.78%_-3.47%_12.47%_-3.47%]" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[2.78%_-3.47%_12.47%_-3.47%]" data-name="Group">
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[10.73%_7.73%_15.22%_9.68%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 237.847 182.162">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p17b3a380} fill="var(--fill-0, #E0E0E0)" id="Vector" />
            <path d={svgPaths.p2f2f5930} fill="var(--fill-0, #F0F0F0)" id="Vector_2" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p2ebdf200} fill="var(--fill-0, #E0E0E0)" id="Vector_3" />
            <path d={svgPaths.p14f2f900} fill="var(--fill-0, #F0F0F0)" id="Vector_4" />
            <path d={svgPaths.p5492df0} fill="var(--fill-0, #F0F0F0)" id="Vector_5" />
            <path d={svgPaths.pa802700} fill="var(--fill-0, #F0F0F0)" id="Vector_6" />
            <path d={svgPaths.p1e4ba800} fill="var(--fill-0, #F0F0F0)" id="Vector_7" />
          </g>
          <path d={svgPaths.p148ff100} fill="var(--fill-0, #E0E0E0)" id="Vector_8" />
          <path d={svgPaths.p6b46600} fill="var(--fill-0, #F0F0F0)" id="Vector_9" />
          <path d={svgPaths.p25016a80} fill="var(--fill-0, #F0F0F0)" id="Vector_10" />
          <path d={svgPaths.p1fec2d00} fill="var(--fill-0, #F0F0F0)" id="Vector_11" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[2.78%_-3.47%_12.47%_-3.47%]" data-name="Group">
      <Group1 />
      <Group4 />
    </div>
  );
}

function BackgroundComplete() {
  return (
    <div className="absolute contents inset-[2.78%_-3.47%_12.47%_-3.47%]" data-name="Background_Complete">
      <Group />
    </div>
  );
}

function Shadow() {
  return (
    <div className="absolute inset-[90.42%_8.53%_3.91%_8.53%]" data-name="Shadow">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 238.871 13.9499">
        <g id="Shadow">
          <path d={svgPaths.p195cb900} fill="var(--fill-0, #F5F5F5)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[12.55%_37.72%_51.05%_6.98%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 159.277 89.5474">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p3b0b3500} fill="var(--fill-0, #5D9EFE)" id="Vector" />
            <path d={svgPaths.p3b0b3500} fill="var(--fill-0, white)" id="Vector_2" opacity="0.6" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p1cd7ac80} fill="var(--fill-0, #5D9EFE)" id="Vector_3" />
            <path d={svgPaths.p1cd7ac80} fill="var(--fill-0, black)" id="Vector_4" opacity="0.2" />
          </g>
          <g id="Group_4">
            <g id="Group_5">
              <path d={svgPaths.p32fe8300} fill="var(--fill-0, #5D9EFE)" id="Vector_5" />
              <path d={svgPaths.p32fe8300} fill="var(--fill-0, black)" id="Vector_6" opacity="0.4" />
            </g>
            <path d={svgPaths.p192add00} fill="var(--fill-0, #5D9EFE)" id="Vector_7" />
          </g>
          <g id="Group_6">
            <path d={svgPaths.p2525e500} fill="var(--fill-0, #5D9EFE)" id="Vector_8" />
            <path d={svgPaths.p2525e500} fill="var(--fill-0, white)" id="Vector_9" opacity="0.6" />
          </g>
          <path d={svgPaths.p280fa000} fill="var(--fill-0, #5D9EFE)" id="Vector_10" />
          <path d={svgPaths.p199b7a00} fill="var(--fill-0, #5D9EFE)" id="Vector_11" />
          <path d={svgPaths.p2e9d6d80} fill="var(--fill-0, #5D9EFE)" id="Vector_12" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[48.9%_38.8%_47.06%_53.79%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3354 9.93662">
        <g id="Group">
          <path d={svgPaths.p3c682af0} fill="var(--fill-0, #5D9EFE)" id="Vector" />
          <path d={svgPaths.p3c682af0} fill="var(--fill-0, black)" id="Vector_2" opacity="0.3" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[45.91%_39.19%_51.46%_56.44%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5993 6.47779">
        <g id="Group">
          <path d={svgPaths.p49fc800} fill="var(--fill-0, #5D9EFE)" id="Vector" />
          <path d={svgPaths.p49fc800} fill="var(--fill-0, white)" id="Vector_2" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[48.9%_46.54%_47.13%_46.21%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.8641 9.75016">
        <g id="Group">
          <path d={svgPaths.p82a7a80} fill="var(--fill-0, #5D9EFE)" id="Vector" />
          <path d={svgPaths.p82a7a80} fill="var(--fill-0, black)" id="Vector_2" opacity="0.3" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[45.91%_38.8%_47.06%_46.21%]" data-name="Group">
      <Group8 />
      <Group9 />
      <Group10 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[12.55%_37.72%_47.06%_6.98%]" data-name="Group">
      <Group6 />
      <Group7 />
    </div>
  );
}

function Mail() {
  return (
    <div className="absolute contents inset-[12.55%_37.72%_47.06%_6.98%]" data-name="Mail">
      <Group5 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[16.42%_19.32%_6.52%_52.28%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 81.7775 189.573">
        <g id="Group">
          <path d={svgPaths.p51e9d80} fill="var(--fill-0, #E4897B)" id="Vector" />
          <path d={svgPaths.p3aec7500} fill="var(--fill-0, #E4897B)" id="Vector_2" />
          <path d={svgPaths.p3444300} fill="var(--fill-0, #E4897B)" id="Vector_3" />
          <path d={svgPaths.p3c40eb00} fill="var(--fill-0, #263238)" id="Vector_4" />
          <path d={svgPaths.p2f465780} fill="var(--fill-0, #DE5753)" id="Vector_5" />
          <path d={svgPaths.p3e7e5f70} fill="var(--fill-0, #263238)" id="Vector_6" />
          <path d={svgPaths.p340ef200} fill="var(--fill-0, #E4897B)" id="Vector_7" />
          <path d={svgPaths.p2c011b00} fill="var(--fill-0, #263238)" id="Vector_8" />
          <path d={svgPaths.pdd20400} fill="var(--fill-0, #5D9EFE)" id="Vector_9" />
          <path d={svgPaths.p25a31670} fill="var(--fill-0, #5D9EFE)" id="Vector_10" />
          <path d={svgPaths.p28b2ce00} fill="var(--fill-0, #5D9EFE)" id="Vector_11" />
          <path d={svgPaths.pb124a00} fill="var(--fill-0, #5D9EFE)" id="Vector_12" />
          <path d={svgPaths.p48ead00} fill="var(--fill-0, #E4897B)" id="Vector_13" />
          <path d={svgPaths.p4a9f200} fill="var(--fill-0, #E4897B)" id="Vector_14" />
          <path d={svgPaths.p1b22dc32} fill="var(--fill-0, #263238)" id="Vector_15" />
          <path d={svgPaths.p2bf5a100} fill="var(--fill-0, #263238)" id="Vector_16" />
          <path d={svgPaths.p1af82900} fill="var(--fill-0, #E4897B)" id="Vector_17" />
          <g id="Group_2">
            <path d={svgPaths.p369b7380} fill="var(--fill-0, #5D9EFE)" id="Vector_18" />
            <path d={svgPaths.p369b7380} fill="var(--fill-0, black)" id="Vector_19" opacity="0.4" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p3e0c9800} fill="var(--fill-0, #5D9EFE)" id="Vector_20" />
            <path d={svgPaths.p3e0c9800} fill="var(--fill-0, black)" id="Vector_21" opacity="0.6" />
          </g>
          <g id="Group_4">
            <path d={svgPaths.p132600f0} fill="var(--fill-0, #5D9EFE)" id="Vector_22" />
            <path d={svgPaths.p132600f0} fill="var(--fill-0, black)" id="Vector_23" opacity="0.4" />
          </g>
          <g id="Group_5">
            <path d={svgPaths.p39161e00} fill="var(--fill-0, #5D9EFE)" id="Vector_24" />
            <path d={svgPaths.p39161e00} fill="var(--fill-0, black)" id="Vector_25" opacity="0.6" />
          </g>
          <g id="Group_6">
            <path d={svgPaths.p2b50ed80} fill="var(--fill-0, #5D9EFE)" id="Vector_26" />
            <path d={svgPaths.p2b50ed80} fill="var(--fill-0, black)" id="Vector_27" opacity="0.4" />
          </g>
          <path d={svgPaths.p3b2b180} fill="var(--fill-0, #E4897B)" id="Vector_28" />
          <path d={svgPaths.p1f017200} fill="var(--fill-0, #E4897B)" id="Vector_29" />
          <g id="Group_7">
            <path d={svgPaths.p3519af00} fill="var(--fill-0, #CE6F64)" id="Vector_30" />
            <path d={svgPaths.p3af31df0} fill="var(--fill-0, #CE6F64)" id="Vector_31" />
          </g>
          <path d={svgPaths.p2850f400} fill="var(--fill-0, #263238)" id="Vector_32" />
          <path d={svgPaths.p2920100} fill="var(--fill-0, #E4897B)" id="Vector_33" />
          <path d={svgPaths.pee69400} fill="var(--fill-0, #263238)" id="Vector_34" />
          <path d={svgPaths.p3e2d6080} fill="var(--fill-0, #263238)" id="Vector_35" />
          <path d={svgPaths.p2b003600} fill="var(--fill-0, #263238)" id="Vector_36" />
          <path d={svgPaths.p2208e680} fill="var(--fill-0, #E4897B)" id="Vector_37" />
          <path d={svgPaths.p375a7ef0} fill="var(--fill-0, #263238)" id="Vector_38" />
          <path d={svgPaths.pbfcb500} fill="var(--fill-0, #263238)" id="Vector_39" />
          <g id="Group_8">
            <path d={svgPaths.p238e3880} fill="var(--fill-0, #5D9EFE)" id="Vector_40" />
            <path d={svgPaths.p238e3880} fill="var(--fill-0, white)" id="Vector_41" opacity="0.5" />
          </g>
          <g id="Group_9">
            <path d={svgPaths.p22004180} fill="var(--fill-0, #5D9EFE)" id="Vector_42" />
            <path d={svgPaths.p22004180} fill="var(--fill-0, black)" id="Vector_43" opacity="0.1" />
          </g>
          <g id="Group_10">
            <path d={svgPaths.p2d76b100} fill="var(--fill-0, #5D9EFE)" id="Vector_44" />
            <path d={svgPaths.p2d76b100} fill="var(--fill-0, white)" id="Vector_45" opacity="0.4" />
          </g>
          <g id="Group_11">
            <path d={svgPaths.p2b53a880} fill="var(--fill-0, #5D9EFE)" id="Vector_46" />
            <path d={svgPaths.p2b53a880} fill="var(--fill-0, white)" id="Vector_47" opacity="0.5" />
          </g>
          <g id="Group_12">
            <path d={svgPaths.p1cbee580} fill="var(--fill-0, #5D9EFE)" id="Vector_48" />
            <path d={svgPaths.p1cbee580} fill="var(--fill-0, white)" id="Vector_49" opacity="0.4" />
          </g>
          <g id="Group_13">
            <path d={svgPaths.p18df5600} fill="var(--fill-0, #5D9EFE)" id="Vector_50" />
            <path d={svgPaths.p18df5600} fill="var(--fill-0, black)" id="Vector_51" opacity="0.1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Character() {
  return (
    <div className="absolute contents inset-[16.42%_19.32%_6.52%_52.28%]" data-name="Character">
      <Group11 />
    </div>
  );
}

function Component4957160MailSent() {
  return (
    <div className="h-[246px] overflow-clip relative shrink-0 w-[288px]" data-name="4957160_Mail sent 1">
      <BackgroundComplete />
      <Shadow />
      <Mail />
      <Character />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Lufga:SemiBold',sans-serif] leading-[0] min-h-px min-w-px not-italic relative text-[#34393e] text-[0px] text-center whitespace-pre-wrap">
        <span className="font-['Lufga:Bold',sans-serif] leading-[24px] text-[48px]">Envelope enviado com sucesso!</span>
        <span className="leading-[normal] text-[36px]">{` 😎🚀`}</span>
      </p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full z-[4]">
      <Breadcrumb />
      <Component4957160MailSent />
      <Frame39 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] isolate items-center justify-center relative shrink-0 w-full">
      <Frame25 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[16px] text-center w-[858px] z-[1]">
        <p className="leading-[normal] whitespace-pre-wrap">Agora é só aguardar as partes assinarem, se precisar, você pode copiar o link de assinatura do documento abaixo e enviar diretamente.</p>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[0] not-italic relative shrink-0 text-[16px] text-center w-[722px] whitespace-nowrap">
      <div className="flex flex-col font-['Lufga:SemiBold',sans-serif] justify-center relative shrink-0 text-[#42494f]">
        <p className="leading-[normal]">Link para assinatura:</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-h-px min-w-px overflow-hidden relative text-[#0d6efd] text-ellipsis">
        <p className="leading-[16px] overflow-hidden">https://signamais.com.br/gcf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e</p>
      </div>
    </div>
  );
}

function ContentCopy() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="content_copy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="content_copy">
          <mask height="24" id="mask0_4_6350" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6350)">
            <path d={svgPaths.p2f284900} fill="var(--fill-0, #0D6EFD)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0 size-[40px]" data-name="button">
      <ContentCopy />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[16px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#f5f4f7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame62 />
      <Button />
    </div>
  );
}

function ForwardToInbox() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="forward_to_inbox">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="forward_to_inbox">
          <mask height="24" id="mask0_4_6269" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6269)">
            <path d={svgPaths.p368efb70} fill="var(--fill-0, #495057)" id="forward_to_inbox_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <ForwardToInbox />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[0px] text-center whitespace-nowrap">
        <p>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#42494f] text-[16px]">Enviado em:</span>
          <span className="leading-[normal] text-[20px]">{` `}</span>
          <span className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic text-[16px]">15/11/2024 - 17:27:58</span>
        </p>
      </div>
    </div>
  );
}

function ShareEta() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="share_eta">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="share_eta">
          <mask height="24" id="mask0_4_6265" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6265)">
            <path d={svgPaths.p340baf80} fill="var(--fill-0, #495057)" id="share_eta_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <ShareEta />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[0px] text-center whitespace-nowrap">
        <p>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#42494f] text-[16px]">Expira em:</span>
          <span className="leading-[normal] text-[20px]">{` `}</span>
          <span className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic text-[16px]">20/11/2024 (5 dias)</span>
        </p>
      </div>
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check_circle">
          <mask height="24" id="mask0_4_6261" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6261)">
            <path d={svgPaths.p292dd980} fill="var(--fill-0, #177B4C)" id="check_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <CheckCircle />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0c64e6] text-[0px] text-center whitespace-nowrap">
        <p className="text-[#42494f]">
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] text-[16px]">Assinado em:</span>
          <span className="font-['Lufga:Bold',sans-serif] leading-[normal] text-[20px]">{` `}</span>
          <span className="font-['Lufga:Bold',sans-serif] leading-[16px] text-[16px]">15/11/2024 - 17:27:58</span>
        </p>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
        <Frame46 />
        <Frame43 />
        <Frame44 />
        <Frame45 />
      </div>
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_4_6377" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6377)">
            <path d={svgPaths.p10615c80} fill="var(--fill-0, #3F1168)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3f1168] text-[20px]">Signatários</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <KeyboardArrowDown />
        </div>
      </div>
    </div>
  );
}

function ForwardToInbox1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="forward_to_inbox">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="forward_to_inbox">
          <mask height="32" id="mask0_3_3505" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_3_3505)">
            <path d={svgPaths.p18b1300} fill="var(--fill-0, #0C64E6)" id="forward_to_inbox_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function AccountCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="account_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="account_circle">
          <mask height="24" id="mask0_3_3517" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3517)">
            <path d={svgPaths.p8ea680} fill="var(--fill-0, #42494F)" id="account_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <AccountCircle />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0e0f11] text-[16px]">Peter Pan</p>
    </div>
  );
}

function Mail1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mail">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mail">
          <mask height="24" id="mask0_3_3513" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3513)">
            <path d={svgPaths.p27654af8} fill="var(--fill-0, #42494F)" id="mail_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Mail1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0e0f11] text-[16px]">peter.pan@gmail.com</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame27 />
      <Frame26 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[201px]">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#858a8e] text-[16px] w-full whitespace-pre-wrap">Signatário 1</p>
      <Frame29 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <ForwardToInbox1 />
      <Frame28 />
    </div>
  );
}

function Frame37() {
  return <div className="content-stretch flex gap-[16px] items-center shrink-0" />;
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">Assinaturas:</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">1/2</p>
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex flex-col items-start overflow-clip relative rounded-[10000px] shrink-0 w-[100px]" data-name="progress bar">
      <div className="bg-[#ffcd39] h-[17px] rounded-[10000px] shrink-0 w-[50px]" />
    </div>
  );
}

function CellTable() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0" data-name="cell table">
      <Frame2 />
      <Frame3 />
      <ProgressBar />
    </div>
  );
}

function Signatario() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Signatário">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[24px] relative w-full">
          <Frame31 />
          <Frame37 />
          <CellTable />
        </div>
      </div>
    </div>
  );
}

function ForwardToInbox2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="forward_to_inbox">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="forward_to_inbox">
          <mask height="32" id="mask0_3_3505" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_3_3505)">
            <path d={svgPaths.p18b1300} fill="var(--fill-0, #0C64E6)" id="forward_to_inbox_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function AccountCircle1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="account_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="account_circle">
          <mask height="24" id="mask0_3_3517" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3517)">
            <path d={svgPaths.p8ea680} fill="var(--fill-0, #42494F)" id="account_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <AccountCircle1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0e0f11] text-[16px]">Peter Pan</p>
    </div>
  );
}

function Mail2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mail">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mail">
          <mask height="24" id="mask0_3_3513" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3513)">
            <path d={svgPaths.p27654af8} fill="var(--fill-0, #42494F)" id="mail_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Mail2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0e0f11] text-[16px]">peter.pan@gmail.com</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[201px]">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#858a8e] text-[16px] w-full whitespace-pre-wrap">Signatário 2</p>
      <Frame34 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <ForwardToInbox2 />
      <Frame30 />
    </div>
  );
}

function Frame38() {
  return <div className="content-stretch flex gap-[16px] items-center shrink-0" />;
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">Assinaturas:</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">2/2</p>
      </div>
    </div>
  );
}

function ProgressBar1() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex flex-col items-start overflow-clip relative rounded-[10000px] shrink-0 w-[100px]" data-name="progress bar">
      <div className="bg-[#0d6efd] h-[17px] rounded-[10000px] shrink-0 w-full" />
    </div>
  );
}

function CellTable1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0" data-name="cell table">
      <Frame4 />
      <Frame5 />
      <ProgressBar1 />
    </div>
  );
}

function Signatario1() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Signatário">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[24px] relative w-full">
          <Frame33 />
          <Frame38 />
          <CellTable1 />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Signatario />
      <Signatario1 />
    </div>
  );
}

function Signatarios() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Signatários">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[24px] py-[32px] relative w-full">
        <Frame53 />
        <Frame32 />
      </div>
    </div>
  );
}

function KeyboardArrowDown1() {
  return (
    <div className="relative size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_4_6377" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6377)">
            <path d={svgPaths.p10615c80} fill="var(--fill-0, #3F1168)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3f1168] text-[20px]">Documento(s) enviado(s)</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <KeyboardArrowDown1 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Documento</p>
      </div>
    </div>
  );
}

function CellHeader() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="cell header">
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Data de Assinatura</p>
      </div>
    </div>
  );
}

function CellHeader1() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[182px]" data-name="cell header">
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Status</p>
      </div>
    </div>
  );
}

function CellHeader2() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[182px]" data-name="cell header">
      <Frame8 />
    </div>
  );
}

function Frame9() {
  return <div className="content-stretch flex items-center justify-center px-[8px] shrink-0" />;
}

function CellHeader3() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[24px]" data-name="cell header">
      <Frame9 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="bg-[#f5eafe] content-stretch flex items-center relative rounded-[12px] shrink-0 w-full z-[6]">
      <CellHeader />
      <CellHeader1 />
      <CellHeader2 />
      <CellHeader3 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">ContratoAluguel.pdf</p>
      </div>
    </div>
  );
}

function CellTable2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">15/12/2024 - 15:45</p>
      </div>
    </div>
  );
}

function CellTable3() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e8bb34] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Pendente</p>
      </div>
    </div>
  );
}

function CellTable4() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame12 />
    </div>
  );
}

function ActionHome() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_3_1380" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_1380)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CellTable5() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0" data-name="cell table">
      <ActionHome />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[5]">
      <CellTable2 />
      <CellTable3 />
      <CellTable4 />
      <CellTable5 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">ContratoAluguel.pdf</p>
      </div>
    </div>
  );
}

function CellTable6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">15/12/2024 - 15:45</p>
      </div>
    </div>
  );
}

function CellTable7() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame14 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#177b4c] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Assinado</p>
      </div>
    </div>
  );
}

function CellTable8() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame15 />
    </div>
  );
}

function ActionHome1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_3_1380" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_1380)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CellTable9() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0" data-name="cell table">
      <ActionHome1 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[3]">
      <CellTable6 />
      <CellTable7 />
      <CellTable8 />
      <CellTable9 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">ContratoAluguel.pdf</p>
      </div>
    </div>
  );
}

function CellTable10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame16 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[0px] whitespace-nowrap">
        <p className="font-['Lufga:Regular',sans-serif] leading-[16px] text-[16px]">15/12/2024 - 15:45</p>
      </div>
    </div>
  );
}

function CellTable11() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame17 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#177b4c] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Assinado</p>
      </div>
    </div>
  );
}

function CellTable12() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame18 />
    </div>
  );
}

function ActionHome2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_3_1380" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_1380)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CellTable13() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0" data-name="cell table">
      <ActionHome2 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[1]">
      <CellTable10 />
      <CellTable11 />
      <CellTable12 />
      <CellTable13 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] isolate items-start relative shrink-0 w-full">
      <Frame56 />
      <Frame57 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full z-[4]" data-name="Divider" />
      <Frame60 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full z-[2]" data-name="Divider" />
      <Frame61 />
    </div>
  );
}

function DocumentoSEnviado() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Documento(s) enviado">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[24px] py-[32px] relative w-full">
        <Frame55 />
        <Frame58 />
      </div>
    </div>
  );
}

function KeyboardArrowDown2() {
  return (
    <div className="relative size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_4_6377" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6377)">
            <path d={svgPaths.p10615c80} fill="var(--fill-0, #3F1168)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3f1168] text-[20px]">Histórico do Envelope</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <KeyboardArrowDown2 />
        </div>
      </div>
    </div>
  );
}

function CheckCircle1() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="check_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="check_circle">
          <mask height="40" id="mask0_4_6245" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="40" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="40" id="Bounding box" width="40" />
          </mask>
          <g mask="url(#mask0_4_6245)">
            <path d={svgPaths.p184e0900} fill="var(--fill-0, #177B4C)" id="check_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[16px] relative shrink-0 text-[#42494f] w-full">
        <span className="font-['Lufga:Bold',sans-serif] leading-[16px]">Arthur Tracz Truculo</span>
        <span className="leading-[normal]">{` assinou o documento.`}</span>
      </p>
      <p className="font-['Lufga:Bold',sans-serif] h-[16px] relative shrink-0 text-[#495057] w-full">
        <span className="leading-[16px]">{`Email: `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px]">michael.jackson@gmail.com</span>
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#495057] w-full">
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[normal]">Código:</span>
        <span className="leading-[normal]">{` 089edf48-292a-4dac-8b7c-d31b2ef58536`}</span>
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative text-[16px] whitespace-pre-wrap">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#858a8e] w-full">12 de Nov, 2024 - 14:21:57</p>
      <Frame49 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <CheckCircle1 />
      <Frame48 />
    </div>
  );
}

function CheckCircle2() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="check_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="check_circle">
          <mask height="40" id="mask0_4_6245" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="40" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="40" id="Bounding box" width="40" />
          </mask>
          <g mask="url(#mask0_4_6245)">
            <path d={svgPaths.p184e0900} fill="var(--fill-0, #177B4C)" id="check_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[16px] relative shrink-0 text-[#42494f] w-full">
        <span className="font-['Lufga:Bold',sans-serif] leading-[16px]">Arthur Tracz Truculo</span>
        <span className="leading-[normal]">{` assinou o documento.`}</span>
      </p>
      <p className="font-['Lufga:Bold',sans-serif] h-[16px] relative shrink-0 text-[#495057] w-full">
        <span className="leading-[16px]">{`Email: `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px]">michael.jackson@gmail.com</span>
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#495057] w-full">
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[normal]">Código:</span>
        <span className="leading-[normal]">{` 089edf48-292a-4dac-8b7c-d31b2ef58536`}</span>
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative text-[16px] whitespace-pre-wrap">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#858a8e] w-full">12 de Nov, 2024 - 14:21:57</p>
      <Frame52 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <CheckCircle2 />
      <Frame51 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame40 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full" data-name="Divider" />
      <Frame41 />
    </div>
  );
}

function HistoricoDoEnvelope() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Histórico do Envelope">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative w-full">
        <Frame59 />
        <Frame50 />
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Signatarios />
      <DocumentoSEnviado />
      <HistoricoDoEnvelope />
    </div>
  );
}

function ArrowForward2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_forward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_forward">
          <mask height="24" id="mask0_4_6249" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_6249)">
            <path d={svgPaths.p472ad40} fill="var(--fill-0, #8925E2)" id="arrow_forward_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#8925e2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[16px]">Novo Envelope</p>
      <ArrowForward2 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-end relative shrink-0 w-[858px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#34393e] text-[0px] text-[24px] w-[min-content] whitespace-pre-wrap">
        <span className="leading-[normal] text-[#858a8e]">ID Envelope:</span>
        <span className="leading-[normal]">{` `}</span>
        <span className="leading-[normal] text-[#0e0f11]">#26364</span>
      </p>
      <Frame47 />
      <Frame63 />
      <Button1 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center pt-[50px] px-[24px] relative size-full">
          <Frame1 />
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="absolute content-stretch flex items-start justify-center left-0 top-0 w-[1920px]">
      <SideBar />
      <Frame42 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[81px] top-[34px]">
      <div className="absolute flex h-[873.845px] items-center justify-center left-[81px] top-[34px] w-[1064.545px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "1086" } as React.CSSProperties}>
        <div className="flex-none rotate-60">
          <div className="h-[970px] relative w-[449px]" data-name="https://lottiefiles.com/animations/celebration-confetti-json-QIroMtQ1Or">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHttpsLottiefilesComAnimationsCelebrationConfettiJsonQIroMtQ1Or} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[873.845px] items-center justify-center left-[897px] top-[82px] w-[1064.545px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "1086" } as React.CSSProperties}>
        <div className="flex-none rotate-120">
          <div className="h-[970px] relative w-[449px]" data-name="https://lottiefiles.com/animations/celebration-confetti-json-QIroMtQ1Or">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHttpsLottiefilesComAnimationsCelebrationConfettiJsonQIroMtQ1Or} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="1">
      <Frame64 />
      <Group12 />
    </div>
  );
}