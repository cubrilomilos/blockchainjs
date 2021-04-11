import { Component } from '@angular/core';
import Block from 'blockchain/block';
import Blockchain from 'blockchain/blockchain';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	title = 'blockchainjs';
	difficulty = 1;
	difficultyMessage = '';

	onDifficultyChange = (e: any) => {
		this.difficulty = +e.target.value;
		this.difficultyMessage = 'Check console for result. \n';

		if (this.difficulty > 4) {
			this.difficultyMessage += 'If difficulty is greater than 4 mining might take long time. In this case restart browser.';
		}
	}

	executeBlockchain = (): void => {
		console.log(this.difficulty);
		const blockchain = new Blockchain(this.difficulty);

	}
}
