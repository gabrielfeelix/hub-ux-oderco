import svgPaths from "./svg-wp7v7ze3ox";

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
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[14px]">Novo Envelope</p>
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

function Frame20() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Lufga:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0e0f11] text-[36px]">Novo Envelope</p>
      <HelpOutline />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Breadcrumb />
      <Frame20 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
      <Frame11 />
    </div>
  );
}

function Paid() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="paid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="paid">
          <mask height="24" id="mask0_3_1416" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_1416)">
            <path d={svgPaths.p2e71c00} fill="var(--fill-0, #495057)" id="paid_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
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

function Frame() {
  return (
    <div className="bg-[#f5f4f7] content-stretch flex items-center justify-center p-[16px] relative rounded-[1000px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <Frame1 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check">
          <mask height="24" id="mask0_3_3070" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3070)">
            <path d={svgPaths.p1cdb8180} fill="var(--fill-0, #8925E2)" id="check_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#8925e2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[16px]">Enviar sem posicionar</p>
      <Check />
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check">
          <mask height="24" id="mask0_3_2227" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_2227)">
            <path d={svgPaths.p1cdb8180} fill="var(--fill-0, white)" id="check_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#8925e2] content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-white">Enviar</p>
      <Check1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame />
      <Button />
      <Button1 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[16px] h-[71px] items-end justify-end relative shrink-0 w-full z-[2]" data-name="Title">
      <Frame24 />
      <Frame9 />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[10000px] shrink-0 size-[24px]" data-name="2">
      <div aria-hidden="true" className="absolute border-2 border-[#9729f8] border-solid inset-0 pointer-events-none rounded-[10000px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8925e2] text-[16px] text-center w-[7px] whitespace-pre-wrap">1</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center relative shrink-0 w-full">
      <Component />
      <div className="flex flex-col font-['Lufga:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0e0f11] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Selecione um documento</p>
      </div>
    </div>
  );
}

function UploadFile() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="upload_file">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="upload_file">
          <mask height="48" id="mask0_3_3066" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="48" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="48" id="Bounding box" width="48" />
          </mask>
          <g mask="url(#mask0_3_3066)">
            <path d={svgPaths.pcdaaf00} fill="var(--fill-0, #8925E2)" id="upload_file_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconDocumentCard() {
  return (
    <div className="bg-[#f5eafe] content-stretch flex items-center overflow-clip p-[12px] relative rounded-[10000px] shrink-0 size-[72px]" data-name="icon document card">
      <UploadFile />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start leading-[0] not-italic relative shrink-0 text-[#6d7379] text-center w-full">
      <div className="flex flex-col justify-center relative shrink-0 text-[0px] w-full">
        <p className="text-[16px] whitespace-pre-wrap">
          <span className="leading-[normal]">Tamanho máximo:</span>
          <span className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic">{` 25mb`}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[16px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Formatos suportados: .pdf e .doc</p>
      </div>
    </div>
  );
}

function AnexarDocumento() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center p-[40px] relative rounded-[16px] shrink-0 w-[451px]" data-name="Anexar documento">
      <div aria-hidden="true" className="absolute border border-[#cf9dfc] border-dashed inset-0 pointer-events-none rounded-[16px]" />
      <Frame19 />
      <IconDocumentCard />
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#f6f8fa] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[100px] relative size-full">
          <AnexarDocumento />
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[10000px] shrink-0 size-[24px]" data-name="2">
      <div aria-hidden="true" className="absolute border-2 border-[#9729f8] border-solid inset-0 pointer-events-none rounded-[10000px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8925e2] text-[16px] text-center w-[7px] whitespace-pre-wrap">2</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Component1 />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Signatários</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#abafb2] text-[16px] whitespace-pre-wrap">Insira um nome</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f5f4f7] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
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
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#42494f] text-[16px] w-full whitespace-pre-wrap">Nome</p>
      <Frame4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#abafb2] text-[16px] whitespace-pre-wrap">email@mail.com</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f5f4f7] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[16px] relative size-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input3 />
    </div>
  );
}

function Input2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#42494f] text-[16px] w-full whitespace-pre-wrap">E-mail</p>
      <Frame6 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Input />
      <Input2 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#858a8e] text-[16px]">1º Signatário</p>
      <Frame10 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <mask height="24" id="mask0_3_3058" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3058)">
            <path d={svgPaths.p2fd7c000} fill="var(--fill-0, #6D7379)" id="add_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#abafb2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d7379] text-[16px]">Novo Signatário</p>
      <Add />
    </div>
  );
}

function Check2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check">
          <mask height="24" id="mask0_3_3070" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3070)">
            <path d={svgPaths.p1cdb8180} fill="var(--fill-0, #8925E2)" id="check_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#8925e2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#8925e2] text-[16px]">Salvar</p>
      <Check2 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame16 />
      <Frame23 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[4px] relative rounded-[10000px] shrink-0 size-[24px]" data-name="2">
      <div aria-hidden="true" className="absolute border-2 border-[#9729f8] border-solid inset-0 pointer-events-none rounded-[10000px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#8925e2] text-[16px] text-center w-[7px] whitespace-pre-wrap">3</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Component2 />
      <p className="font-['Lufga:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-black">Assinaturas</p>
    </div>
  );
}

function AssinaturasAdicionadas() {
  return (
    <div className="bg-[#e7f1ff] content-stretch flex gap-[9px] items-center not-italic p-[16px] relative rounded-[8px] shrink-0 text-[16px]" data-name="Assinaturas adicionadas">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] relative shrink-0 text-[#0c64e6]">0</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6d7379]">Assinaturas adicionadas</p>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="info">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="info">
          <mask height="24" id="mask0_3_3078" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_3078)">
            <path d={svgPaths.p399ee200} fill="var(--fill-0, #42494F)" id="info_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Info />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#42494f] text-[0px] text-[16px] whitespace-pre-wrap">
        <span className="leading-[normal]">{`Para adicionar um local de assinatura, `}</span>
        <span className="font-['Lufga:Bold',sans-serif] leading-[normal]">{`clique com o botão direito `}</span>
        <span className="leading-[normal]">em alguma parte do documento a esquerda.</span>
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <Frame22 />
      <AssinaturasAdicionadas />
      <Frame18 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[420px]">
      <Frame21 />
      <Frame12 />
      <Frame17 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[32px] items-start min-h-px min-w-px relative w-full z-[1]">
      <Frame8 />
      <Frame13 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] isolate items-start min-h-px min-w-px relative w-full z-[1]">
      <Title />
      <Frame14 />
    </div>
  );
}

export default function Frame5() {
  return (
    <div className="content-stretch flex flex-col isolate items-start px-[24px] relative size-full">
      <Frame15 />
    </div>
  );
}