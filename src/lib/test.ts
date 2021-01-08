const test = () => {
    console.log(process.env.APP_CONFIG)
}

function useKey<T, K extends Extract<keyof T, string>>(o: T, k: K) {
    const name: string = k; // Error: keyof T is not assignable to string
    return name
}

export default useKey