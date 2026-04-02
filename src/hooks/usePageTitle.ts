import { useEffect } from "react";

const SITE_NAME = "RepX";

export default function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - 每一下都算數`;
    return () => {
      document.title = `${SITE_NAME} - 每一下都算數`;
    };
  }, [title]);
}
