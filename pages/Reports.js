import Report from "../components/Report.component";

export default function Reports({ data }) {
  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-1 md:gap-0">
          <div className="mt-5 md:mt-0">
            <div>
              <Report />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
