import svgPaths from "./svg-tct6vut0ll";

function Frame4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="font-['Segoe_UI:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#212529] text-[20px] w-[562px] whitespace-pre-wrap">Adicionar Crédito(s)</p>
    </div>
  );
}

function MaterialSymbolsClose() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:close">
          <path d={svgPaths.p2edaeb50} fill="var(--fill-0, #212529)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame4 />
      <MaterialSymbolsClose />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#edeeee] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[24px] pt-[32px] px-[32px] relative w-full">
        <Frame3 />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-2 border-[#edeeee] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[16px] relative w-full">
          <p className="flex-[1_0_0] font-['Segoe_UI:Regular',sans-serif] leading-[0] min-h-px min-w-px not-italic relative text-[#495057] text-[16px] whitespace-pre-wrap">
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24px]">{`Créditos disponíveis: `}</span>
            <span className="font-['Lufga:Bold',sans-serif] leading-[24px] text-[#282c30]">50 Créditos</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[#42494f] text-[16px] whitespace-pre-wrap">20</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f5f4f7] flex-[1_0_0] h-[56px] min-h-px min-w-px relative rounded-[16px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[16px] relative size-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input1 />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#42494f] text-[16px] w-full whitespace-pre-wrap">Quantidade de Créditos</p>
      <Frame6 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[32px] py-[24px] relative w-full">
        <Frame8 />
        <Input />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] h-[56px] items-center justify-center p-[16px] relative rounded-[16px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border-2 border-[#abafb2] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6d7379] text-[16px]">Fechar</p>
    </div>
  );
}

function Check() {
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
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[16px] text-white">Adicionar</p>
      <Check />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-start justify-end px-[32px] py-[24px] relative w-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

export default function Frame7() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] size-full">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}