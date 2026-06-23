import svgPaths from "./svg-tpjual6yx";

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

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full">
      <LogoSignaBranca />
    </div>
  );
}