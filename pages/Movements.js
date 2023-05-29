import Movement from "../components/Movement.component";

export default function Movements({ data }) {
  return (
    <>
      <div className="mt-4 sm:mt-0">
        <div className="md:grid md:grid-cols-1 md:gap-0">
          <div className="mt-5 md:mt-0">
            <div>
              <Movement />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
