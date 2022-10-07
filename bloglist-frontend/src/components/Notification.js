const Notification = ({message,notifStatus}) => {
    let notifStyle = null
    if (message === null) {
      return null
    }
    
    if (notifStatus === "green"){
        notifStyle={color: "green"}
    }

    if (notifStatus === "red"){
        notifStyle={color: "red"}
    }


    return (
      <div className="error" style={notifStyle}>
        {message}
      </div>
    )
  }
  
  export default Notification