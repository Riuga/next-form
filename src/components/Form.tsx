'use client'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export default function TaskForm() {
  const [formData, setFormData] = useState({
    token: '317ad1fc-e0a9-11ef-a978-0242ac120007',
    title: '',
    description: '',
    tags: '',
    budgetFrom: '',
    budgetTo: '',
    deadline: '',
    reminds: '',
    qty_freelancers: '',
  })

  const [all_auto_responses, setResponses] = useState(false)

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()

    const response = await fetch(
      `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${
        formData.token
      }&title=${formData.title}&description=${
        formData.description
      }&tags=${formData.tags.split(' ')}&budget_from=${
        formData.budgetFrom
      }&budget_to=${formData.budgetTo}&deadline=${formData.deadline}&reminds=${
        formData.reminds
      }&all_auto_responses=${all_auto_responses}`
    )

    if (response.ok) {
      alert('Задача опубликована!')
      setFormData({
        token: formData.token,
        title: '',
        description: '',
        tags: '',
        budgetFrom: '',
        budgetTo: '',
        deadline: '',
        reminds: '',
        qty_freelancers: '',
      })
    } else {
      alert('Ошибка при публикации задачи.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto p-4 bg-white rounded shadow-md'
    >
      <div className='mb-4'>
        <label className='block text-black'>Токен:</label>
        <input
          type='text'
          name='token'
          value={formData.token}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Название:</label>
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Описание:</label>
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Теги:</label>
        <input
          type='text'
          name='tags'
          value={formData.tags}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Бюджет от:</label>
        <input
          type='number'
          name='budgetFrom'
          value={formData.budgetFrom}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Бюджет до:</label>
        <input
          type='number'
          name='budgetTo'
          value={formData.budgetTo}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Срок (дни):</label>
        <input
          type='number'
          name='deadline'
          value={formData.deadline}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Напоминания:</label>
        <input
          type='number'
          name='reminds'
          value={formData.reminds}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-black'>Фрилансеры:</label>
        <input
          type='number'
          name='qty_freelancers'
          value={formData.qty_freelancers}
          onChange={handleChange}
          className='mt-1 text-black block w-full border rounded p-2'
        />
      </div>
      <div className='mb-4'>
        <label className='flex items-center text-black'>
          <input
            type='checkbox'
            name='all_auto_responses'
            checked={all_auto_responses}
            onChange={() => {
              setResponses((prev) => !prev)
            }}
            className='mr-2'
          />
          Включить автоматические ответы
        </label>
      </div>
      <button
        type='submit'
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
      >
        Отправить
      </button>
    </form>
  )
}
