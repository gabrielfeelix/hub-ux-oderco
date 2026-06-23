import svgPaths from "./svg-qdsntgxwlo";

function ContentCopy() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="content_copy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="content_copy">
          <mask height="24" id="mask0_3_5153" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_5153)">
            <path d={svgPaths.p2f284900} fill="var(--fill-0, #1C1B1F)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ScreenRotation() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="screen_rotation">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="screen_rotation">
          <mask height="24" id="mask0_3_5157" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_5157)">
            <path d={svgPaths.p342849f0} fill="var(--fill-0, #1C1B1F)" id="screen_rotation_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#f6f8fa] content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[8px] shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)] shrink-0">
      <ContentCopy />
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#edeeee] h-full shrink-0 w-[2px]" />
      </div>
      <ScreenRotation />
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <mask height="24" id="mask0_3_5149" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_3_5149)">
            <path d={svgPaths.p31410000} fill="var(--fill-0, #C8303F)" id="close_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame />
      <Close />
    </div>
  );
}

function Assinatura1() {
  return (
    <div className="bg-[rgba(93,158,254,0.2)] content-stretch flex flex-col gap-[4px] h-[90px] items-center justify-center p-[24px] relative rounded-[8px] shrink-0 w-[212px]" data-name="assinatura">
      <div aria-hidden="true" className="absolute border-2 border-[#0c64e6] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Miss_Fajardose:Regular',sans-serif] leading-[40px] not-italic relative shrink-0 text-[#34393e] text-[48px] text-center w-full whitespace-pre-wrap">Peter Pan</p>
      <div className="bg-[#6d7379] h-[2px] shrink-0 w-full" />
    </div>
  );
}

export default function Assinatura() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative size-full" data-name="assinatura">
      <Frame1 />
      <Assinatura1 />
    </div>
  );
}