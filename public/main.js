var Main = { // 화면 Main
    preload() { // 이미지로드 등의 전처리
        this.load.image('box', 'assets/box.png'); // 이미지 로드
        this.load.image('ground', 'assets/ground.png'); // 이미지 로드
    },
    create() { // 생성될 시 한번만 실행
        var platforms = this.physics.add.staticGroup(); // 지형 그룹
        platforms.create(000, 600, 'ground').setScale(0.5).refreshBody(); // 지형
        platforms.create(300, 600, 'ground').setScale(0.5).refreshBody(); // 지형
        platforms.create(600, 600, 'ground').setScale(0.5).refreshBody(); // 지형
        platforms.create(900, 600, 'ground').setScale(0.5).refreshBody(); // 지형

        platforms.create(600, 400, 'ground').setScale(0.2).refreshBody(); // 발판

        var box = this.physics.add.sprite(200, 450, 'box').setScale(0.5); // 박스 객체
        var item = this.physics.add.sprite(600, 300, 'box').setScale(0.2); // 아이템 객체

        box.setBounce(0.2); // 튕겨내기 정도
        box.setFriction(0.5)
        box.setCollideWorldBounds(true); // 월드와의 충돌 여부

        this.physics.add.collider(box, platforms); // 지형 그룹과 충돌 판정 설정
        this.physics.add.collider(item, platforms); // 지형 그룹과 충돌 판정 설정

        this.physics.add.overlap(box, item, (box, item) => { // 아이템과 충돌 이벤트
            item.disableBody(true, true) // 아이템을 삭제함
        }, null, this);


        this.box = box; // 멤버 변수로 넣어줌으로써 update에서 사용할 수 있도록 함
        this.cursors = this.input.keyboard.createCursorKeys(); // 키 이벤트를 받아오기 위한 객체
    },
    update() { // 틱마다 계속 갱신되는 곳
        if (this.cursors.left.isDown) { // 왼쪽 화살표 키를 눌렀을 시
            this.box.setVelocityX(this.box.body.velocity.x + (-200 - this.box.body.velocity.x) / 10); // 왼쪽으로 힘을 줌 (-200)
      }
        else if (this.cursors.right.isDown) { // 오른쪽 화살표 키를 눌렀을 시
            this.box.setVelocityX(this.box.body.velocity.x + (200 - this.box.body.velocity.x) / 10); // 오른쪽으로 힘을 줌 (200)
        }
        else { // 아무 키도 누르지 않았을 시
            this.box.setVelocityX(this.box.body.velocity.x - this.box.body.velocity.x / 20); // 강제 제동 (0)
        }
        if (this.cursors.up.isDown && this.box.body.touching.down) { // 위쪽 화살표 키를 눌렀으며 지면과 충돌하고 있을 시
            this.box.setVelocityY(-500); // 위쪽으로 힘을 줌
        }
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800, // 가로
    height: 600, // 세로
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [Main],
};
let game = new Phaser.Game(config);