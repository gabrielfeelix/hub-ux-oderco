import svgPaths from "./svg-r0iszusg5o";

function Frame68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start leading-[normal] min-h-px min-w-px not-italic relative whitespace-pre-wrap">
      <p className="font-['Lufga:SemiBold',sans-serif] relative shrink-0 text-[36px] text-black w-full">Documentos</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6d7379] text-[16px] w-full">Acompanhe abaixo os documentos de assinatura:</p>
    </div>
  );
}

function Paid() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="paid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="paid">
          <mask height="24" id="mask0_15_1726" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1726)">
            <path d={svgPaths.p2e71c00} fill="var(--fill-0, #495057)" id="paid_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Paid />
      <p className="font-['Poppins:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#393939] text-[0px] text-[16px] text-center">
        <span className="font-['Poppins:Regular',sans-serif] leading-[normal] text-[#6d7379]">Créditos:</span>
        <span className="leading-[normal] text-[#0e0f11]">{` `}</span>
        <span className="leading-[normal] text-[#6b1db0]">25</span>
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#f5f4f7] content-stretch flex items-center justify-center p-[16px] relative rounded-[1000px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <Frame9 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[2]">
      <Frame68 />
      <Frame8 />
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check_circle">
          <mask height="24" id="mask0_15_1738" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1738)">
            <path d={svgPaths.p339d1980} fill="var(--fill-0, #177B4C)" id="check_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard() {
  return (
    <div className="bg-[#e8f3ee] content-stretch flex items-center overflow-clip p-[12px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <CheckCircle />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#495057] text-[16px] w-[min-content] whitespace-pre-wrap">Assinados</p>
      <p className="font-['Lufga:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#0e0f11] text-[30px]">475</p>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] py-[32px] relative w-full">
          <IconDocumentCard />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Send() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="send">
          <mask height="24" id="mask0_15_1682" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1682)">
            <path d={svgPaths.p25849280} fill="var(--fill-0, #0C64E6)" id="send_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard1() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex items-center overflow-clip p-[12px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <Send />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#495057] text-[16px] w-[min-content] whitespace-pre-wrap">Enviados</p>
      <p className="font-['Lufga:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#0e0f11] text-[30px]">36</p>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-center px-[24px] py-[32px] relative rounded-[8px] shrink-0 w-[252px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <IconDocumentCard1 />
      <Frame1 />
    </div>
  );
}

function ShareEta() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="share_eta">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="share_eta">
          <mask height="24" id="mask0_15_1734" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1734)">
            <path d={svgPaths.p340baf80} fill="var(--fill-0, #E8BB34)" id="share_eta_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard2() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex items-center overflow-clip p-[12px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <ShareEta />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#495057] text-[16px] w-[min-content] whitespace-pre-wrap">Expira em Breve</p>
      <p className="font-['Lufga:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#0e0f11] text-[30px]">31</p>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-center px-[24px] py-[32px] relative rounded-[8px] shrink-0 w-[252px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <IconDocumentCard2 />
      <Frame2 />
    </div>
  );
}

function EmergencyHome() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="emergency_home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="emergency_home">
          <mask height="24" id="mask0_15_1706" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1706)">
            <path d={svgPaths.p1512280} fill="var(--fill-0, #C8303F)" id="emergency_home_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard3() {
  return (
    <div className="bg-[#fcebec] content-stretch flex items-center overflow-clip p-[12px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <EmergencyHome />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#495057] text-[16px] w-[min-content] whitespace-pre-wrap">Expirados</p>
      <p className="font-['Lufga:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#0e0f11] text-[30px]">98</p>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-center px-[24px] py-[32px] relative rounded-[8px] shrink-0 w-[252px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <IconDocumentCard3 />
      <Frame4 />
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <mask height="24" id="mask0_15_1686" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1686)">
            <path d={svgPaths.p31410000} fill="var(--fill-0, #42494F)" id="close_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard4() {
  return (
    <div className="bg-[#edeeee] content-stretch flex items-center overflow-clip p-[12px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <Close />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#495057] text-[16px] w-[min-content] whitespace-pre-wrap">Cancelados</p>
      <p className="font-['Lufga:Bold',sans-serif] leading-[24px] relative shrink-0 text-[#0e0f11] text-[30px]">8</p>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-center px-[24px] py-[32px] relative rounded-[8px] shrink-0 w-[252px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <IconDocumentCard4 />
      <Frame5 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <mask height="24" id="mask0_15_1714" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1714)">
            <path d={svgPaths.p2fd7c000} fill="var(--fill-0, #0C64E6)" id="add_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard5() {
  return (
    <div className="bg-[#b4d2fe] content-stretch flex items-center overflow-clip p-[12px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <Add />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0c64e6] text-[16px] w-[90px] whitespace-pre-wrap">Novo Envelope</p>
    </div>
  );
}

function CardNovoDocumento() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex gap-[16px] h-full items-center p-[24px] relative rounded-[8px] shrink-0" data-name="card novo documento">
      <div aria-hidden="true" className="absolute border-2 border-[#0c64e6] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)]" />
      <IconDocumentCard5 />
      <Frame6 />
    </div>
  );
}

function DocumentGroupCard() {
  return (
    <div className="bg-[#f6f8fa] relative shrink-0 w-full z-[2]" data-name="document group card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[24px] relative w-full">
          <Card />
          <Card1 />
          <Card2 />
          <Card3 />
          <Card4 />
          <div className="flex flex-row items-center self-stretch">
            <CardNovoDocumento />
          </div>
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="search">
          <mask height="24" id="mask0_15_1730" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1730)">
            <path d={svgPaths.p11fee800} fill="var(--fill-0, #6D7379)" id="search_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <Search />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#abafb2] text-[16px] whitespace-pre-wrap">Pesquisar</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f5f4f7] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[16px] relative size-full">
          <Frame58 />
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input1 />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[249px]" data-name="input">
      <Frame64 />
    </div>
  );
}

function FilterAlt() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="filter_alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="filter_alt">
          <mask height="24" id="mask0_15_1710" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1710)">
            <path d={svgPaths.p17da0b00} fill="var(--fill-0, #8925E2)" id="filter_alt_2" />
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
      <FilterAlt />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="button">
      <Button1 />
    </div>
  );
}

function Add1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <mask height="24" id="mask0_15_1702" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1702)">
            <path d={svgPaths.p2fd7c000} fill="var(--fill-0, #8925E2)" id="add_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#8925e2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Add1 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[2]">
      <Input />
      <Button />
      <Button2 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-[#858a8e] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d7379] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">#</p>
      </div>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-[42px]" data-name="Header Cell">
      <Frame10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Documento(s) do Envelope</p>
      </div>
    </div>
  );
}

function CellHeader() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="cell header">
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Destinatários</p>
      </div>
    </div>
  );
}

function CellHeader1() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[278px]" data-name="cell header">
      <Frame12 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Dt. Envio</p>
      </div>
    </div>
  );
}

function CellHeader2() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[182px]" data-name="cell header">
      <Frame13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Dt. Conclusão</p>
      </div>
    </div>
  );
}

function CellHeader3() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[182px]" data-name="cell header">
      <Frame14 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Status</p>
      </div>
    </div>
  );
}

function CellHeader4() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[182px]" data-name="cell header">
      <Frame15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Progresso</p>
      </div>
    </div>
  );
}

function CellHeader5() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 w-[180px]" data-name="cell header">
      <Frame16 />
    </div>
  );
}

function Frame17() {
  return <div className="content-stretch flex items-center justify-center px-[8px] shrink-0" />;
}

function CellHeader6() {
  return (
    <div className="content-stretch flex h-[32px] items-center py-[16px] relative shrink-0 w-[60px]" data-name="cell header">
      <Frame17 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="bg-[#f5eafe] content-stretch flex items-center relative rounded-[8px] shrink-0 w-full z-[2]" data-name="table header">
      <Frame54 />
      <HeaderCell />
      <CellHeader />
      <CellHeader1 />
      <CellHeader2 />
      <CellHeader3 />
      <CellHeader4 />
      <CellHeader5 />
      <CellHeader6 />
    </div>
  );
}

function Check1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-[#dee2e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check1 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d7379] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">12</p>
      </div>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-[42px]" data-name="Header Cell">
      <Frame18 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Contrato-Locação.pdf</p>
      </div>
    </div>
  );
}

function CellTable() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame19 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#495057] text-[16px] text-ellipsis whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden">Santos Dumont / Deolane Bezerra / Silvio Santos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellTable1() {
  return (
    <div className="content-stretch flex items-center justify-end py-[32px] relative shrink-0 w-[278px]" data-name="cell table">
      <Frame20 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable2() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame21 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable3() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame22 />
    </div>
  );
}

function Send1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="send">
          <mask height="16" id="mask0_15_1698" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_15_1698)">
            <path d={svgPaths.p3ded7900} fill="var(--fill-0, #0C64E6)" id="send_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard6() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex items-center overflow-clip p-[4px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <Send1 />
    </div>
  );
}

function StatusTable() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[8px] relative shrink-0" data-name="status table">
      <IconDocumentCard6 />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0c64e6] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Enviado</p>
      </div>
    </div>
  );
}

function CellTable4() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <StatusTable />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
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

function CellTable5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-[180px]" data-name="cell table">
      <Frame23 />
      <ProgressBar />
    </div>
  );
}

function ActionHome() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_15_1694" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1694)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[60px]" data-name="Cell">
      <ActionHome />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[11]" data-name="table header">
      <Frame56 />
      <HeaderCell1 />
      <CellTable />
      <CellTable1 />
      <CellTable2 />
      <CellTable3 />
      <CellTable4 />
      <CellTable5 />
      <Cell />
    </div>
  );
}

function Check2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-[#dee2e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check2 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d7379] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">12</p>
      </div>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-[42px]" data-name="Header Cell">
      <Frame24 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Contrato-Locação.pdf</p>
      </div>
    </div>
  );
}

function CellTable6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame25 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#495057] text-[16px] text-ellipsis whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden">Santos Dumont / Deolane Bezerra / Silvio Santos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellTable7() {
  return (
    <div className="content-stretch flex items-center justify-end py-[32px] relative shrink-0 w-[278px]" data-name="cell table">
      <Frame26 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable8() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame27 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable9() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame28 />
    </div>
  );
}

function CheckCircle1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check_circle">
          <mask height="16" id="mask0_15_1690" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_15_1690)">
            <path d={svgPaths.p23a23900} fill="var(--fill-0, #177B4C)" id="check_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard7() {
  return (
    <div className="bg-[#e8f3ee] content-stretch flex items-center overflow-clip p-[4px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <CheckCircle1 />
    </div>
  );
}

function StatusTable1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[8px] relative shrink-0" data-name="status table">
      <IconDocumentCard7 />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#177b4c] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Assinado</p>
      </div>
    </div>
  );
}

function CellTable10() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <StatusTable1 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
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

function CellTable11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-[180px]" data-name="cell table">
      <Frame29 />
      <ProgressBar1 />
    </div>
  );
}

function ActionHome1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_15_1694" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1694)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[60px]" data-name="Cell">
      <ActionHome1 />
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[9]" data-name="table header">
      <Frame62 />
      <HeaderCell2 />
      <CellTable6 />
      <CellTable7 />
      <CellTable8 />
      <CellTable9 />
      <CellTable10 />
      <CellTable11 />
      <Cell1 />
    </div>
  );
}

function Check3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-[#dee2e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check3 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d7379] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">12</p>
      </div>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-[42px]" data-name="Header Cell">
      <Frame30 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Contrato-Locação.pdf</p>
      </div>
    </div>
  );
}

function CellTable12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame31 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#495057] text-[16px] text-ellipsis whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden">Santos Dumont / Deolane Bezerra / Silvio Santos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellTable13() {
  return (
    <div className="content-stretch flex items-center justify-end py-[32px] relative shrink-0 w-[278px]" data-name="cell table">
      <Frame32 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable14() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame33 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable15() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame34 />
    </div>
  );
}

function ShareEta1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="share_eta">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="share_eta">
          <mask height="16" id="mask0_15_1674" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_15_1674)">
            <path d={svgPaths.p3b345780} fill="var(--fill-0, #E8BB34)" id="share_eta_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard8() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex items-center overflow-clip p-[4px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <ShareEta1 />
    </div>
  );
}

function StatusTable2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[8px] relative shrink-0" data-name="status table">
      <IconDocumentCard8 />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e8bb34] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Expira em Breve</p>
      </div>
    </div>
  );
}

function CellTable16() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <StatusTable2 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">1/2</p>
      </div>
    </div>
  );
}

function ProgressBar2() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex flex-col items-start overflow-clip relative rounded-[10000px] shrink-0 w-[100px]" data-name="progress bar">
      <div className="bg-[#ffcd39] h-[17px] rounded-[10000px] shrink-0 w-[50px]" />
    </div>
  );
}

function CellTable17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-[180px]" data-name="cell table">
      <Frame35 />
      <ProgressBar2 />
    </div>
  );
}

function ActionHome2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_15_1694" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1694)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[60px]" data-name="Cell">
      <ActionHome2 />
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[7]" data-name="table header">
      <Frame63 />
      <HeaderCell3 />
      <CellTable12 />
      <CellTable13 />
      <CellTable14 />
      <CellTable15 />
      <CellTable16 />
      <CellTable17 />
      <Cell2 />
    </div>
  );
}

function Check4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-[#dee2e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check4 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d7379] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">12</p>
      </div>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-[42px]" data-name="Header Cell">
      <Frame36 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Contrato-Locação.pdf</p>
      </div>
    </div>
  );
}

function CellTable18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame37 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#495057] text-[16px] text-ellipsis whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden">Santos Dumont / Deolane Bezerra / Silvio Santos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellTable19() {
  return (
    <div className="content-stretch flex items-center justify-end py-[32px] relative shrink-0 w-[278px]" data-name="cell table">
      <Frame38 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable20() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame39 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable21() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame40 />
    </div>
  );
}

function CheckCircle2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check_circle">
          <mask height="16" id="mask0_15_1690" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_15_1690)">
            <path d={svgPaths.p23a23900} fill="var(--fill-0, #177B4C)" id="check_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard9() {
  return (
    <div className="bg-[#e8f3ee] content-stretch flex items-center overflow-clip p-[4px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <CheckCircle2 />
    </div>
  );
}

function StatusTable3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[8px] relative shrink-0" data-name="status table">
      <IconDocumentCard9 />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#177b4c] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Assinado</p>
      </div>
    </div>
  );
}

function CellTable22() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <StatusTable3 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">1/2</p>
      </div>
    </div>
  );
}

function ProgressBar3() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex flex-col items-start overflow-clip relative rounded-[10000px] shrink-0 w-[100px]" data-name="progress bar">
      <div className="bg-[#0d6efd] h-[17px] rounded-[10000px] shrink-0 w-full" />
    </div>
  );
}

function CellTable23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-[180px]" data-name="cell table">
      <Frame41 />
      <ProgressBar3 />
    </div>
  );
}

function ActionHome3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_15_1694" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1694)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[60px]" data-name="Cell">
      <ActionHome3 />
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[5]" data-name="table header">
      <Frame65 />
      <HeaderCell4 />
      <CellTable18 />
      <CellTable19 />
      <CellTable20 />
      <CellTable21 />
      <CellTable22 />
      <CellTable23 />
      <Cell3 />
    </div>
  );
}

function Check5() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-[#dee2e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check5 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d7379] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">12</p>
      </div>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-[42px]" data-name="Header Cell">
      <Frame42 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Contrato-Locação.pdf</p>
      </div>
    </div>
  );
}

function CellTable24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame43 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#495057] text-[16px] text-ellipsis whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden">Santos Dumont / Deolane Bezerra / Silvio Santos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellTable25() {
  return (
    <div className="content-stretch flex items-center justify-end py-[32px] relative shrink-0 w-[278px]" data-name="cell table">
      <Frame44 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable26() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame45 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable27() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame46 />
    </div>
  );
}

function Close1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <mask height="16" id="mask0_15_1678" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_15_1678)">
            <path d={svgPaths.p3a73d3a2} fill="var(--fill-0, #42494F)" id="close_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard10() {
  return (
    <div className="bg-[#edeeee] content-stretch flex items-center overflow-clip p-[4px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <Close1 />
    </div>
  );
}

function StatusTable4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[8px] relative shrink-0" data-name="status table">
      <IconDocumentCard10 />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#42494f] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Cancelado</p>
      </div>
    </div>
  );
}

function CellTable28() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <StatusTable4 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">1/2</p>
      </div>
    </div>
  );
}

function ProgressBar4() {
  return <div className="bg-[#e7f1ff] h-[17px] rounded-[10000px] shrink-0 w-[100px]" data-name="progress bar" />;
}

function CellTable29() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-[180px]" data-name="cell table">
      <Frame47 />
      <ProgressBar4 />
    </div>
  );
}

function ActionHome4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_15_1694" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1694)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[60px]" data-name="Cell">
      <ActionHome4 />
    </div>
  );
}

function TableHeader5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[3]" data-name="table header">
      <Frame66 />
      <HeaderCell5 />
      <CellTable24 />
      <CellTable25 />
      <CellTable26 />
      <CellTable27 />
      <CellTable28 />
      <CellTable29 />
      <Cell4 />
    </div>
  );
}

function Check6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Check">
      <div aria-hidden="true" className="absolute border-2 border-[#dee2e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[40px]">
      <Check6 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6d7379] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">12</p>
      </div>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-[42px]" data-name="Header Cell">
      <Frame48 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Contrato-Locação.pdf</p>
      </div>
    </div>
  );
}

function CellTable30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[32px] relative" data-name="cell table">
      <Frame49 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#495057] text-[16px] text-ellipsis whitespace-nowrap">
            <p className="leading-[16px] overflow-hidden">Santos Dumont / Deolane Bezerra / Silvio Santos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CellTable31() {
  return (
    <div className="content-stretch flex items-center justify-end py-[32px] relative shrink-0 w-[278px]" data-name="cell table">
      <Frame50 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable32() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame51 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">15 out, 2024 - 15:48</p>
      </div>
    </div>
  );
}

function CellTable33() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <Frame52 />
    </div>
  );
}

function EmergencyHome1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="emergency_home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="emergency_home">
          <mask height="16" id="mask0_15_1670" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_15_1670)">
            <path d={svgPaths.p2459d200} fill="var(--fill-0, #C8303F)" id="emergency_home_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard11() {
  return (
    <div className="bg-[#fcebec] content-stretch flex items-center overflow-clip p-[4px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <EmergencyHome1 />
    </div>
  );
}

function StatusTable5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center px-[8px] relative shrink-0" data-name="status table">
      <IconDocumentCard11 />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c8303f] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Expirado</p>
      </div>
    </div>
  );
}

function CellTable34() {
  return (
    <div className="content-stretch flex items-center py-[32px] relative shrink-0 w-[182px]" data-name="cell table">
      <StatusTable5 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">1/2</p>
      </div>
    </div>
  );
}

function ProgressBar5() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex flex-col items-start overflow-clip relative rounded-[10000px] shrink-0 w-[100px]" data-name="progress bar">
      <div className="bg-[#0d6efd] h-[17px] rounded-[10000px] shrink-0 w-full" />
    </div>
  );
}

function CellTable35() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-[180px]" data-name="cell table">
      <Frame53 />
      <ProgressBar5 />
    </div>
  );
}

function ActionHome5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="action home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more_vert">
          <mask height="24" id="mask0_15_1694" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_15_1694)">
            <path d={svgPaths.p34810300} fill="var(--fill-0, #6D7379)" id="more_vert_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[60px]" data-name="Cell">
      <ActionHome5 />
    </div>
  );
}

function TableHeader6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full z-[1]" data-name="table header">
      <Frame67 />
      <HeaderCell6 />
      <CellTable30 />
      <CellTable31 />
      <CellTable32 />
      <CellTable33 />
      <CellTable34 />
      <CellTable35 />
      <Cell5 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full z-[1]">
      <TableHeader1 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full z-[10]" data-name="Divider" />
      <TableHeader2 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full z-[8]" data-name="Divider" />
      <TableHeader3 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full z-[6]" data-name="Divider" />
      <TableHeader4 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full z-[4]" data-name="Divider" />
      <TableHeader5 />
      <div className="bg-[#f8f8f8] h-[2px] shrink-0 w-full z-[2]" data-name="Divider" />
      <TableHeader6 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] isolate items-end relative shrink-0 w-full z-[1]">
      <TableHeader />
      <Frame60 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] isolate items-end relative rounded-[24px] shrink-0 w-full z-[1]">
      <Frame55 />
      <Frame57 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] isolate items-start relative shrink-0 w-full z-[1]">
      <DocumentGroupCard />
      <Frame7 />
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] isolate items-start relative size-full">
      <Frame61 />
      <Frame59 />
    </div>
  );
}