import svgPaths from "./svg-e1zxv1vx70";

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#42494f] text-[14px] whitespace-pre-wrap">Peter Pan</p>
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_down">
          <mask height="24" id="mask0_3_5074" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_5074)">
            <path d={svgPaths.p33a42b80} fill="var(--fill-0, #42494F)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f5f4f7] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[8px]" data-name="input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame />
          <KeyboardArrowDown />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Input1 />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="input">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#42494f] text-[14px] w-full whitespace-pre-wrap">Signatário</p>
      <Frame1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#8925e2] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="button">
      <p className="font-['Lufga:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-white">Inserir</p>
    </div>
  );
}

export default function AdicionarSign() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-end p-[24px] relative rounded-[16px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)] size-full" data-name="adicionar sign">
      <Input />
      <Button />
    </div>
  );
}