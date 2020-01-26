import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../node_modules/@angular/forms';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { RtfService } from './rtf.service'
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileList:any=[]
  //setting File path
  public filePath;
  url: any;
  //event listener function for file
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      //file preview
      var reader = new FileReader();
      console.log("reader", reader)
      //it is for url of the file
      this.filePath = event.target.files[0].name;
      console.log("File path", this.filePath);
      const [file] = event.target.files;
      reader.readAsDataURL(file); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
       this.url = reader.result; //add source to file
    
      }
    }
  }
  public success_message: string;
  public failure_message: string;
  public contestForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private rtf: RtfService) {
    this.contestForm = this.formBuilder.group({
      cardImage: ["", Validators.required]
    })
  }
  download(filename){
    console.log("inside ts")
    this.rtf.download(filename)
   .then(
        blob => {
        saveAs(blob, "RTFFile.rtf");
        this.success_message = "RTF File downloaded successfully "
      })
      .catch((err) => {
        this.failure_message = "Unable to download the file"
      })
 
  }
  upload(){
    this.fileList.push(this.filePath);
    this.rtf.upload(this.filePath, this.url)
    .then((data)=>{
      this.success_message="File Uploaded successfully"
    })
    .catch((err)=>{
      this.failure_message = "Unable to upload the file"
    })
  }
  remove(fileName){
      this.fileList.pop(fileName);
      this.rtf.remove(fileName)
     .then((data)=>{
      this.success_message="File Deleted  successfully"
    })
    .catch((err)=>{
      this.failure_message = "Unable to delete the file"
    })
  }

}
