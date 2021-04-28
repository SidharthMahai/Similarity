import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
word: string;
synonyms: any;

  constructor(private http: HttpClient, private speech: SpeechRecognition, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  find(){
    if(this.word.length>=2)
    {
    this.http.get('https://api.datamuse.com/words?rel_syn=' + this.word).subscribe(result=>this.synonyms=result)
    console.log(this.synonyms);
    }
    else
    {
      this.synonyms=null;
    }
  }

  record()
  {
    this.speech.hasPermission().then((permission)=>
    {
      if(permission)
      {
        this.speech.startListening().subscribe((data)=>{
          this.speech.stopListening();
          this.word=data[0];
          this.cd.detectChanges();
          this.find();
        })
      }
      else{
        this.speech.requestPermission().then((data)=>{
          this.record();
        })
      }
    })
  }




}
