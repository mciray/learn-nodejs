// helper functions
const send_target_file = (file_name) => {
    console.log("TETİKLENDİM.")
    return `${process.cwd()}/pages/${file_name}`
}


module.exports = {

    send_target_file
}