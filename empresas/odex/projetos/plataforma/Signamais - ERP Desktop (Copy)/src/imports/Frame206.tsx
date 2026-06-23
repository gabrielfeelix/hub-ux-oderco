import svgPaths from "./svg-da8k0j0458";

function ArrowForward() {
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
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="breadcrumb">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#cf9dfc] text-[14px]">Documentos</p>
      <ArrowForward />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[14px]">26364</p>
    </div>
  );
}

function HelpOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Help outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_3_3074)" id="Help outline">
          <g id="Vector" />
          <path d={svgPaths.p31b60c00} fill="var(--fill-0, #6D7379)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_3_3074">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Lufga:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0e0f11] text-[36px]">Detalhes do Envelope</p>
      <HelpOutline />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Breadcrumb />
      <Frame3 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
      <Frame2 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[16px] h-[71px] items-end justify-center relative shrink-0 w-full" data-name="Title">
      <Frame11 />
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check_circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check_circle">
          <mask height="16" id="mask0_5_7456" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_5_7456)">
            <path d={svgPaths.p23a23900} fill="var(--fill-0, #177B4C)" id="check_circle_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard() {
  return (
    <div className="bg-[#e8f3ee] content-stretch flex items-center overflow-clip p-[4px] relative rounded-[10000px] shrink-0" data-name="icon document card">
      <CheckCircle />
    </div>
  );
}

function StatusTable() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="status table">
      <IconDocumentCard />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#177b4c] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Assinado</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#34393e] text-[0px] text-[24px]">
        <span className="leading-[normal] text-[#858a8e]">ID Envelope:</span>
        <span className="leading-[normal]">{` `}</span>
        <span className="leading-[normal] text-[#0e0f11]">#26364</span>
      </p>
      <StatusTable />
    </div>
  );
}

function Send() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="send">
          <mask height="24" id="mask0_5_7452" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_5_7452)">
            <path d={svgPaths.p25849280} fill="var(--fill-0, white)" id="send_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#8925e2] content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-white">Reenviar Notificação</p>
      <Send />
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <mask height="24" id="mask0_5_7448" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_5_7448)">
            <path d={svgPaths.p31410000} fill="var(--fill-0, #6D7379)" id="close_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d7379] text-[16px]">Cancelar Envelope</p>
      <Close />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame15() {
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

function Button2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0 size-[40px]" data-name="button">
      <ContentCopy />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[16px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#f5f4f7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame15 />
      <Button2 />
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

function Frame5() {
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

function Frame6() {
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

function CheckCircle1() {
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

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <CheckCircle1 />
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

function Frame9() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
        <Frame8 />
        <Frame5 />
        <Frame6 />
        <Frame7 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#495057] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">Assinaturas:</p>
      </div>
    </div>
  );
}

function Frame1() {
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
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="cell table">
      <Frame />
      <Frame1 />
      <ProgressBar />
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_5_7460" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_5_7460)">
            <path d={svgPaths.p10615c80} fill="var(--fill-0, #3F1168)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <CellTable />
      <KeyboardArrowDown />
    </div>
  );
}

function Signatarios() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Signatários">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[32px] relative w-full">
          <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3f1168] text-[20px]">Signatários</p>
          <Frame14 />
        </div>
      </div>
    </div>
  );
}

function KeyboardArrowDown1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_5_7460" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_5_7460)">
            <path d={svgPaths.p10615c80} fill="var(--fill-0, #3F1168)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function DocumentoSEnviado() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Documento(s) enviado">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[32px] relative w-full">
          <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3f1168] text-[20px]">Documento(s) enviado(s)</p>
          <KeyboardArrowDown1 />
        </div>
      </div>
    </div>
  );
}

function KeyboardArrowDown2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_5_7460" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_5_7460)">
            <path d={svgPaths.p10615c80} fill="var(--fill-0, #3F1168)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HistoricoDoEnvelope() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Histórico do Envelope">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[32px] relative w-full">
          <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3f1168] text-[20px]">Histórico do Envelope</p>
          <KeyboardArrowDown2 />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[858px]">
      <Frame10 />
      <Frame12 />
      <Frame9 />
      <Signatarios />
      <DocumentoSEnviado />
      <HistoricoDoEnvelope />
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative size-full">
      <Title />
      <Frame13 />
    </div>
  );
}