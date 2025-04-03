import BusForm from "../components/BusForm";
import DataTable from "../components/DataTable";

const Home = () => {
    return(
        <div>
            <h1>Tabla con buses</h1>
            <DataTable />
            <BusForm />
        </div>
    )
}

export default Home;