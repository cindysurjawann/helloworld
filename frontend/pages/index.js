import {useState, useEffect} from 'react'

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL);
      const data = await res.json();
      setData(data);
    }
    catch (error) {
      setError(error);
    }
  }

  return (
    <div className='p-4'>
		{error && <div className='text-red-600'>Failed to load {error.toString()}</div>}
      {
        !data ? <div>Loading...</div>
          : (
            (data?.data ?? []).length === 0 && <p>data kosong</p>
          )
      }
      <Input onSuccess={getData} />
      {data?.data ? data.data.map((item, index) => (
        <p className='p-4 border-b border-gray-600' key={index}>{item}</p>
      )) :
        <p>data kosong</p>
      }
    </div>
  )
}

function Input({onSuccess}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      text: formData.get("data")
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send`, {
        method: 'POST',
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setData(data.message);
      onSuccess();
    }
    catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <h1 className='w-full text-3xl font-bold text-red-700 uppercase md:text-4xl'>Bank Sinarmas - PUSILKOM UI</h1>
      <h3 className='text-red-700 uppercase'>By Cindy Surjawan</h3>
    
      {error && <p className='text-red-600'>error: {error.toString()}</p>}
      {data && <p className='text-green-500'>success: {data}</p>}
      <form className='p-4' onSubmit={handleSubmit}>
        <input name="data" type="text" className='text-black px-4 rounded-md' />
        <button className='px-4 w-[100px] rounded-md font-medium my-6 mx-auto bg-red-700'>Submit</button>
      </form>
    </div>
  )
}