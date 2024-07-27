export const log = (data: any) => {
    console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}: ${data}`)
}