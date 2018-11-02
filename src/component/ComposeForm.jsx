import React from "react";

const ComposeForm = (props) => {
    return (
        <form class="form-horizontal well">
            <div class="form-group">
                <div class="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div class="form-group">
                <label for="subject" class="col-sm-2 control-label">Subject</label>
                <div class="col-sm-8">
                    <input id="subject" type="text" class="form-control" id="subject" placeholder="Enter a subject" name="subject" ></input>
                </div>
            </div>
            <div class="form-group">
                <label id="body" for="body" class="col-sm-2 control-label">Body</label>
                <div class="col-sm-8">
                    <textarea name="body" id="body" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-8 col-sm-offset-2">
                    <input onClick={props.post} type="submit" value="Send" class="btn btn-primary"></input>
                    <button onClick={props.compose} type="button" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default ComposeForm;