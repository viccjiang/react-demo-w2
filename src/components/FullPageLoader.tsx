import { Oval } from "react-loader-spinner";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/80 backdrop-blur-sm">
      <Oval
        height={60}
        width={60}
        color="#00d4ff"
        secondaryColor="#a855f7"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
}
