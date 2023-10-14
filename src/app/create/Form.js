
export default function Form({title,body,onTitleChange,onBodyChange, onClick}) {
  return (
    <div className="mb-4 flex flex-col">
        <input 
          value={title} 
          onChange={onTitleChange} 
          placeholder="Title" 
          className="p-2 border rounded text-black"
          required
        />
        <textarea 
          value={body} 
          onChange={onBodyChange} 
          placeholder="Body" 
          className="p-2 border w-full rounded mt-2 text-black"
          required
        />
        <button onClick={onClick} className="p-2 bg-primary text-white mt-2 rounded">Create Post</button>
      </div>
  )
}
