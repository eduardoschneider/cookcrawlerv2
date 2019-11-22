import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  audio: any;
  constructor(private platform: Platform, private nativeAudio: NativeAudio) { }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../../assets/intro-song.mp3';
    this.audio.load();
    this.playAudio();
  }

  playAudio() {
    this.audio.play();
    this.audio.loop = true;
   }

  stopAudio() {
    this.audio.pause();
  }
}
