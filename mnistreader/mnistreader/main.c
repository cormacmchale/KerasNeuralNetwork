#include <stdio.h>
int main()
{
	// printf() displays the string inside quotation
	//printf("Hello, World!");

	FILE *pointToMnist;

	int firstNumber;
	int secondNumber;
	int thirdNumber;
	int endLine[50];
	char ch;
	char buf[2];

	pointToMnist = fopen("../../MNIST/train-images.idx3-ubyte","r");
	//pointToMnist = fopen("../../MNIST/numbers.txt", "r");
	//if (pointToMnist != NULL)
	//{
	//	printf("file found");
	//}

	while(fread(buf, 1, 2, pointToMnist))
	{
		printf("%02x%02x", buf[0], buf[1]);
		if (feof(pointToMnist))
		{
			printf("ended");
		}

	};
		//printf("Hello");
		//fscanf(pointToMnist, "%d", &firstNumber);
		//fgets(&endLine, 50, pointToMnist);
		//printf("%s \n", endLine);
		//printf("%d \n", firstNumber);
		//printf("%c", ch);
		getch();
		//break;
	//fscanf(pointToMnist, "%d", firstNumber);
	//printf(firstNumber, "%d");
	//printf("%d", firstNumber);
	getch();
	fclose(pointToMnist);
	return 0;
}