import PageViewTracker from "@/components/tracking/PageViewTracker";
import { getAssetPath } from "@/utils/paths";

export default async function RootPage() {
  return (
    <>
      <PageViewTracker featureName="HOME" />
      <section
        id="landing"
        className="position-relative w-100"
        style={{
          backgroundImage: `url('${getAssetPath("/images/background-left.png")}')`,
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          height: "500px"
        }}
      >
        <div className="container h-100 d-flex align-items-center px-4">
          <h1 className="display-4 fw-bold">Home</h1>
        </div>
      </section>
    </>
  );
}
