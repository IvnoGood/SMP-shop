export function LoginForm() {
    return (
        <form action="" className='flex flex-col gap-2'>
            <label htmlFor="" className='mr-auto font-bold'>Email :</label>

            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder='email@email.com' type="email" name="password" id="passswordinput" />

            <label htmlFor="" className='mr-auto font-bold'>Password :</label>

            <input value={password} onKeyDown={(e) => {
                if (e.key === "Enter") HandleLoginPress(e);
            }} onChange={(event) => setPassword(event.target.value)} placeholder='••••••••••' type="password" name="password" id="passswordinput" />


            <button className='loginbtn' onClick={(e) => HandleLoginPress(e)}>Login</button>
        </form>
    )
}