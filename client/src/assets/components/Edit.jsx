import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";

function Edit() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const {state} = useLocation();
    const isAdmin = (state!=null)?state.isAdmin:'null';
    // const prefix = "https://database.socialeskisehir.com.tr"
    const prefix = "http://localhost:3000"

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${prefix}/api/getCategories`);
            setData(response.data);
        }

        fetchData();
    }, []);


    async function deleteFood(event) {

        function refreshPage() {
            window.location.reload(false);
          }

        try {
            const response = await axios.delete(`${prefix}/api/delete/${event.target.name}`);
            console.log(event.target.name);
            console.log(response.data);
            refreshPage();
        } catch (error) {
            console.error(error);
        }

    };

    function editPage(event) {
        navigate("/admin/duzenleme/sayfasi/q/q/q/t/editPage", { state: { id: event.target.name } });
    }

    function addProduct(){
        navigate("/admin/duzenleme/sayfasi/q/q/q/t/addProduct");
    }


    function createTable() {

        let keys = Object.keys(data);
        let liste = [];

        keys.forEach((keyy, j) => {
            data[keyy].forEach((value, i) => {
                liste.push(
                    <tr key={Math.random() * 10000}>
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                            {value[0]}
                        </th>
                        <td className="px-6 py-4 text-white">
                            {keyy}
                        </td>
                        <td className="px-6 py-4 text-white">
                            {value[2]}
                        </td>
                        <td className="px-6 py-4 text-white">
                            {value[1]}
                        </td>
                        <td className="px-6 py-4">
                            <button name={value[3]} onClick={editPage} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            <button name={value[3]} onClick={deleteFood} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-7">Delete</button>
                        </td>
                    </tr>
                );
            });
        });

        return liste;
    }

    if(isAdmin==='null'){
        return (
            <div className='text-white'>Bu sayfayı görüntülemeye yetkiniz yoktur</div>
    
        );
    }else if(isAdmin==='true'){
        return(
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='text-white'>
                            <th scope="col" className="px-6 py-3">
                                Ürün Adı
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kategori
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Açıklama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fiyat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aksiyon
                            </th>
                        </tr>
                    </thead>
    
                    <tbody>
    
                        {/* <tr>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple Watch 5
                            </th>
                            <td className="px-6 py-4">
                                Red
                            </td>
                            <td className="px-6 py-4">
                                Wearables
                            </td>
                            <td className="px-6 py-4">
                                $999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-7">Delete</a>
                            </td>
                        </tr> */}
    
                        {createTable()}
                    </tbody>
                </table>
    
                <div className='grid grid-cols-3'>
                    <button onClick={addProduct} className="col-start-2 col-span-1 block font-medium text-xl text-blue-600 dark:text-white hover:underline">+ YENİ KAYIT</button>
                </div>
            </div>
        );
    }
}

export default Edit;